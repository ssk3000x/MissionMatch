import axios from "axios";

const GOOGLE_PLACES_API = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const PLACE_DETAILS_API = "https://maps.googleapis.com/maps/api/place/details/json";

type SearchParams = {
  lat: number;
  lng: number;
  radius: number;
  mission: string;
};

export async function searchOrganizations(params: SearchParams) {
  const { lat, lng, radius, mission } = params;

  // Basic type list to probe for community organizations. This can be expanded.
  const types = ["community_center", "library", "school", "church", "establishment"];

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) throw new Error("GOOGLE_PLACES_API_KEY not set in environment");

  // We'll query for each type and merge results (simple approach for hackathon)
  const requests = types.map((type) =>
    axios.get(GOOGLE_PLACES_API, {
      params: {
        location: `${lat},${lng}`,
        radius,
        type,
        keyword: mission || undefined,
        key,
      },
    })
  );

  const responses = await Promise.allSettled(requests);

  const places: any[] = [];
  for (const r of responses) {
    if (r.status === "fulfilled") {
      const data = r.value.data;
      if (Array.isArray(data.results)) {
        places.push(...data.results);
      }
    }
  }

  // Deduplicate by place_id
  const byId: Record<string, any> = {};
  for (const p of places) {
    if (!p.place_id) continue;
    if (!byId[p.place_id]) byId[p.place_id] = p;
  }

  const unique = Object.values(byId).slice(0, 60);

  // Optionally fetch details for each place (phone/address)
  const detailRequests = unique.map((u) =>
    axios
      .get(PLACE_DETAILS_API, {
        params: { place_id: u.place_id, key, fields: "formatted_phone_number,formatted_address,website" },
      })
      .then((r) => ({ id: u.place_id, details: r.data.result }))
      .catch(() => ({ id: u.place_id, details: null }))
  );

  const detailResults = await Promise.allSettled(detailRequests);
  const detailsById: Record<string, any> = {};
  for (const dr of detailResults) {
    if (dr.status === "fulfilled") {
      detailsById[dr.value.id] = dr.value.details;
    }
  }

  const organizations = unique.map((place: any) => {
    const d = detailsById[place.place_id] || {};
    return {
      id: place.place_id,
      name: place.name,
      description: (place.types || []).join(", ") || place.vicinity || "",
      address: d.formatted_address || place.vicinity || "",
      categories: place.types || [],
      status: "ready",
      phone: d.formatted_phone_number || null,
      rating: place.rating || null,
      raw: place,
    };
  });

  return organizations;
}
