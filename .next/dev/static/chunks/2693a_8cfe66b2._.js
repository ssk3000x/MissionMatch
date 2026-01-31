(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsScrollTimeline",
    ()=>supportsScrollTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
;
const supportsScrollTimeline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(()=>window.ScrollTimeline !== undefined);
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseGroupPlaybackControls",
    ()=>BaseGroupPlaybackControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)");
;
class BaseGroupPlaybackControls {
    constructor(animations){
        // Bound to accomodate common `return animation.stop` pattern
        this.stop = ()=>this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    get finished() {
        // Support for new finished Promise and legacy thennable API
        return Promise.all(this.animations.map((animation)=>"finished" in animation ? animation.finished : animation));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */ getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for(let i = 0; i < this.animations.length; i++){
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline, fallback) {
        const subscriptions = this.animations.map((animation)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsScrollTimeline"])() && animation.attachTimeline) {
                return animation.attachTimeline(timeline);
            } else if (typeof fallback === "function") {
                return fallback(animation);
            }
        });
        return ()=>{
            subscriptions.forEach((cancel, i)=>{
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        let max = 0;
        for(let i = 0; i < this.animations.length; i++){
            max = Math.max(max, this.animations[i].duration);
        }
        return max;
    }
    runAll(methodName) {
        this.animations.forEach((controls)=>controls[methodName]());
    }
    flatten() {
        this.runAll("flatten");
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/controls/Group.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupPlaybackControls",
    ()=>GroupPlaybackControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$BaseGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs [app-client] (ecmascript)");
;
/**
 * TODO: This is a temporary class to support the legacy
 * thennable API
 */ class GroupPlaybackControls extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$BaseGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseGroupPlaybackControls"] {
    then(onResolve, onReject) {
        return Promise.all(this.animations).then(onResolve).catch(onReject);
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getValueTransition",
    ()=>getValueTransition
]);
function getValueTransition(transition, key) {
    return transition ? transition[key] || transition["default"] || transition : undefined;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */ __turbopack_context__.s([
    "calcGeneratorDuration",
    ()=>calcGeneratorDuration,
    "maxGeneratorDuration",
    ()=>maxGeneratorDuration
]);
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while(!state.done && duration < maxGeneratorDuration){
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGeneratorEasing",
    ()=>createGeneratorEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)");
;
;
/**
 * Create a progress => progress easing function from a generator.
 */ function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({
        ...options,
        keyframes: [
            0,
            scale
        ]
    });
    const duration = Math.min((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorDuration"])(generator), __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxGeneratorDuration"]);
    return {
        type: "keyframes",
        ease: (progress)=>{
            return generator.next(duration * progress).value / scale;
        },
        duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(duration)
    };
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isGenerator",
    ()=>isGenerator
]);
function isGenerator(type) {
    return typeof type === "function";
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "attachTimeline",
    ()=>attachTimeline
]);
function attachTimeline(animation, timeline) {
    animation.timeline = timeline;
    animation.onfinish = null;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimationControls",
    ()=>NativeAnimationControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$attach$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs [app-client] (ecmascript)");
;
;
class NativeAnimationControls {
    constructor(animation){
        this.animation = animation;
    }
    get duration() {
        var _a, _b, _c;
        const durationInMs = ((_b = (_a = this.animation) === null || _a === void 0 ? void 0 : _a.effect) === null || _b === void 0 ? void 0 : _b.getComputedTiming().duration) || ((_c = this.options) === null || _c === void 0 ? void 0 : _c.duration) || 300;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(durationInMs));
    }
    get time() {
        var _a;
        if (this.animation) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(((_a = this.animation) === null || _a === void 0 ? void 0 : _a.currentTime) || 0);
        }
        return 0;
    }
    set time(newTime) {
        if (this.animation) {
            this.animation.currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(newTime);
        }
    }
    get speed() {
        return this.animation ? this.animation.playbackRate : 1;
    }
    set speed(newSpeed) {
        if (this.animation) {
            this.animation.playbackRate = newSpeed;
        }
    }
    get state() {
        return this.animation ? this.animation.playState : "finished";
    }
    get startTime() {
        return this.animation ? this.animation.startTime : null;
    }
    get finished() {
        return this.animation ? this.animation.finished : Promise.resolve();
    }
    play() {
        this.animation && this.animation.play();
    }
    pause() {
        this.animation && this.animation.pause();
    }
    stop() {
        if (!this.animation || this.state === "idle" || this.state === "finished") {
            return;
        }
        if (this.animation.commitStyles) {
            this.animation.commitStyles();
        }
        this.cancel();
    }
    flatten() {
        var _a;
        if (!this.animation) return;
        (_a = this.animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming({
            easing: "linear"
        });
    }
    attachTimeline(timeline) {
        if (this.animation) (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$attach$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["attachTimeline"])(this.animation, timeline);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
    }
    complete() {
        this.animation && this.animation.finish();
    }
    cancel() {
        try {
            this.animation && this.animation.cancel();
        } catch (e) {}
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBezierDefinition",
    ()=>isBezierDefinition
]);
const isBezierDefinition = (easing)=>Array.isArray(easing) && typeof easing[0] === "number";
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */ __turbopack_context__.s([
    "supportsFlags",
    ()=>supportsFlags
]);
const supportsFlags = {
    linearEasing: undefined
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoSupports",
    ()=>memoSupports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)");
;
;
function memoSupports(callback, supportsFlag) {
    const memoized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(callback);
    return ()=>{
        var _a;
        return (_a = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsFlags"][supportsFlag]) !== null && _a !== void 0 ? _a : memoized();
    };
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsLinearEasing",
    ()=>supportsLinearEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)");
;
const supportsLinearEasing = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoSupports"])(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (e) {
        return false;
    }
    return true;
}, "linearEasing");
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateLinearEasing",
    ()=>generateLinearEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)");
;
const generateLinearEasing = (easing, duration, resolution = 10 // as milliseconds
)=>{
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for(let i = 0; i < numPoints; i++){
        points += easing((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progress"])(0, numPoints - 1, i)) + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cubicBezierAsString",
    ()=>cubicBezierAsString,
    "isWaapiSupportedEasing",
    ()=>isWaapiSupportedEasing,
    "mapEasingToNativeEasing",
    ()=>mapEasingToNativeEasing,
    "supportedWaapiEasing",
    ()=>supportedWaapiEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)");
;
;
;
function isWaapiSupportedEasing(easing) {
    return Boolean(typeof easing === "function" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])() || !easing || typeof easing === "string" && (easing in supportedWaapiEasing || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])()) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBezierDefinition"])(easing) || Array.isArray(easing) && easing.every(isWaapiSupportedEasing));
}
const cubicBezierAsString = ([a, b, c, d])=>`cubic-bezier(${a}, ${b}, ${c}, ${d})`;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ cubicBezierAsString([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: /*@__PURE__*/ cubicBezierAsString([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: /*@__PURE__*/ cubicBezierAsString([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: /*@__PURE__*/ cubicBezierAsString([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    } else if (typeof easing === "function" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])()) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateLinearEasing"])(easing, duration);
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBezierDefinition"])(easing)) {
        return cubicBezierAsString(easing);
    } else if (Array.isArray(easing)) {
        return easing.map((segmentEasing)=>mapEasingToNativeEasing(segmentEasing, duration) || supportedWaapiEasing.easeOut);
    } else {
        return supportedWaapiEasing[easing];
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isDragActive",
    ()=>isDragActive,
    "isDragging",
    ()=>isDragging
]);
const isDragging = {
    x: false,
    y: false
};
function isDragActive() {
    return isDragging.x || isDragging.y;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveElements",
    ()=>resolveElements
]);
function resolveElements(elementOrSelector, scope, selectorCache) {
    var _a;
    if (elementOrSelector instanceof Element) {
        return [
            elementOrSelector
        ];
    } else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            // TODO: Refactor to utils package
            // invariant(
            //     Boolean(scope.current),
            //     "Scope provided, but no element detected."
            // )
            root = scope.current;
        }
        const elements = (_a = selectorCache === null || selectorCache === void 0 ? void 0 : selectorCache[elementOrSelector]) !== null && _a !== void 0 ? _a : root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector);
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setupGesture",
    ()=>setupGesture
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-client] (ecmascript)");
;
function setupGesture(elementOrSelector, options) {
    const elements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveElements"])(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
        passive: true,
        ...options,
        signal: gestureAbortController.signal
    };
    const cancel = ()=>gestureAbortController.abort();
    return [
        elements,
        eventOptions,
        cancel
    ];
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/hover.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hover",
    ()=>hover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-client] (ecmascript)");
;
;
/**
 * Filter out events that are not pointer events, or are triggering
 * while a Motion gesture is active.
 */ function filterEvents(callback) {
    return (event)=>{
        if (event.pointerType === "touch" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragActive"])()) return;
        callback(event);
    };
}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
 *
 * @public
 */ function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupGesture"])(elementOrSelector, options);
    const onPointerEnter = filterEvents((enterEvent)=>{
        const { target } = enterEvent;
        const onHoverEnd = onHoverStart(enterEvent);
        if (typeof onHoverEnd !== "function" || !target) return;
        const onPointerLeave = filterEvents((leaveEvent)=>{
            onHoverEnd(leaveEvent);
            target.removeEventListener("pointerleave", onPointerLeave);
        });
        target.addEventListener("pointerleave", onPointerLeave, eventOptions);
    });
    elements.forEach((element)=>{
        element.addEventListener("pointerenter", onPointerEnter, eventOptions);
    });
    return cancel;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */ __turbopack_context__.s([
    "isNodeOrChild",
    ()=>isNodeOrChild
]);
const isNodeOrChild = (parent, child)=>{
    if (!child) {
        return false;
    } else if (parent === child) {
        return true;
    } else {
        return isNodeOrChild(parent, child.parentElement);
    }
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPrimaryPointer",
    ()=>isPrimaryPointer
]);
const isPrimaryPointer = (event)=>{
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    } else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */ return event.isPrimary !== false;
    }
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isElementKeyboardAccessible",
    ()=>isElementKeyboardAccessible
]);
const focusableElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A"
]);
function isElementKeyboardAccessible(element) {
    return focusableElements.has(element.tagName) || element.tabIndex !== -1;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isPressing",
    ()=>isPressing
]);
const isPressing = new WeakSet();
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enableKeyboardPress",
    ()=>enableKeyboardPress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-client] (ecmascript)");
;
/**
 * Filter out events that are not "Enter" keys.
 */ function filterEvents(callback) {
    return (event)=>{
        if (event.key !== "Enter") return;
        callback(event);
    };
}
function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, {
        isPrimary: true,
        bubbles: true
    }));
}
const enableKeyboardPress = (focusEvent, eventOptions)=>{
    const element = focusEvent.currentTarget;
    if (!element) return;
    const handleKeydown = filterEvents(()=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPressing"].has(element)) return;
        firePointerEvent(element, "down");
        const handleKeyup = filterEvents(()=>{
            firePointerEvent(element, "up");
        });
        const handleBlur = ()=>firePointerEvent(element, "cancel");
        element.addEventListener("keyup", handleKeyup, eventOptions);
        element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    /**
     * Add an event listener that fires on blur to remove the keydown events.
     */ element.addEventListener("blur", ()=>element.removeEventListener("keydown", handleKeydown), eventOptions);
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "press",
    ()=>press
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/setup.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$is$2d$keyboard$2d$accessible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */ function isValidPressEvent(event) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPrimaryPointer"])(event) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragActive"])();
}
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */ function press(elementOrSelector, onPressStart, options = {}) {
    const [elements, eventOptions, cancelEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$setup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupGesture"])(elementOrSelector, options);
    const startPress = (startEvent)=>{
        const element = startEvent.currentTarget;
        if (!isValidPressEvent(startEvent) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPressing"].has(element)) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPressing"].add(element);
        const onPressEnd = onPressStart(startEvent);
        const onPointerEnd = (endEvent, success)=>{
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerCancel);
            if (!isValidPressEvent(endEvent) || !__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPressing"].has(element)) {
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPressing"].delete(element);
            if (typeof onPressEnd === "function") {
                onPressEnd(endEvent, {
                    success
                });
            }
        };
        const onPointerUp = (upEvent)=>{
            onPointerEnd(upEvent, options.useGlobalTarget || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNodeOrChild"])(element, upEvent.target));
        };
        const onPointerCancel = (cancelEvent)=>{
            onPointerEnd(cancelEvent, false);
        };
        window.addEventListener("pointerup", onPointerUp, eventOptions);
        window.addEventListener("pointercancel", onPointerCancel, eventOptions);
    };
    elements.forEach((element)=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$is$2d$keyboard$2d$accessible$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isElementKeyboardAccessible"])(element) && element.getAttribute("tabindex") === null) {
            element.tabIndex = 0;
        }
        const target = options.useGlobalTarget ? window : element;
        target.addEventListener("pointerdown", startPress, eventOptions);
        element.addEventListener("focus", (event)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$utils$2f$keyboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enableKeyboardPress"])(event, eventOptions), eventOptions);
    });
    return cancelEvents;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyGeneratorOptions",
    ()=>applyGeneratorOptions,
    "convertMotionOptionsToNative",
    ()=>convertMotionOptionsToNative
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs [app-client] (ecmascript)");
;
;
;
;
;
const defaultEasing = "easeOut";
function applyGeneratorOptions(options) {
    var _a;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGenerator"])(options.type)) {
        const generatorOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGeneratorEasing"])(options, 100, options.type);
        options.ease = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])() ? generatorOptions.ease : defaultEasing;
        options.duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(generatorOptions.duration);
        options.type = "keyframes";
    } else {
        options.duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])((_a = options.duration) !== null && _a !== void 0 ? _a : 0.3);
        options.ease = options.ease || defaultEasing;
    }
}
// TODO: Reuse for NativeAnimation
function convertMotionOptionsToNative(valueName, keyframes, options) {
    var _a;
    const nativeKeyframes = {};
    const nativeOptions = {
        fill: "both",
        easing: "linear",
        composite: "replace"
    };
    nativeOptions.delay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])((_a = options.delay) !== null && _a !== void 0 ? _a : 0);
    applyGeneratorOptions(options);
    nativeOptions.duration = options.duration;
    const { ease, times } = options;
    if (times) nativeKeyframes.offset = times;
    nativeKeyframes[valueName] = keyframes;
    const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEasingToNativeEasing"])(ease, options.duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */ if (Array.isArray(easing)) {
        nativeKeyframes.easing = easing;
    } else {
        nativeOptions.easing = easing;
    }
    return {
        keyframes: nativeKeyframes,
        options: nativeOptions
    };
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/PseudoAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PseudoAnimation",
    ()=>PseudoAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$convert$2d$options$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs [app-client] (ecmascript)");
;
;
class PseudoAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimationControls"] {
    constructor(target, pseudoElement, valueName, keyframes, options){
        const animationOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$convert$2d$options$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertMotionOptionsToNative"])(valueName, keyframes, options);
        const animation = target.animate(animationOptions.keyframes, {
            pseudoElement,
            ...animationOptions.options
        });
        super(animation);
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/choose-layer-type.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chooseLayerType",
    ()=>chooseLayerType
]);
function chooseLayerType(valueName) {
    if (valueName === "layout") return "group";
    if (valueName === "enter" || valueName === "new") return "new";
    if (valueName === "exit" || valueName === "old") return "old";
    return "group";
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/css.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "css",
    ()=>css
]);
let pendingRules = {};
let style = null;
const css = {
    set: (selector, values)=>{
        pendingRules[selector] = values;
    },
    commit: ()=>{
        if (!style) {
            style = document.createElement("style");
            style.id = "motion-view";
        }
        let cssText = "";
        for(const selector in pendingRules){
            const rule = pendingRules[selector];
            cssText += `${selector} {\n`;
            for (const [property, value] of Object.entries(rule)){
                cssText += `  ${property}: ${value};\n`;
            }
            cssText += "}\n";
        }
        style.textContent = cssText;
        document.head.appendChild(style);
        pendingRules = {};
    },
    remove: ()=>{
        if (style && style.parentElement) {
            style.parentElement.removeChild(style);
        }
    }
};
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/get-layer-name.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLayerName",
    ()=>getLayerName
]);
function getLayerName(pseudoElement) {
    const match = pseudoElement.match(/::view-transition-(old|new|group|image-pair)\((.*?)\)/);
    if (!match) return null;
    return {
        layer: match[2],
        type: match[1]
    };
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/get-view-animations.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getViewAnimations",
    ()=>getViewAnimations
]);
function filterViewAnimations(animation) {
    var _a;
    const { effect } = animation;
    if (!effect) return false;
    return effect.target === document.documentElement && ((_a = effect.pseudoElement) === null || _a === void 0 ? void 0 : _a.startsWith("::view-transition"));
}
function getViewAnimations() {
    return document.getAnimations().filter(filterViewAnimations);
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/has-target.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hasTarget",
    ()=>hasTarget
]);
function hasTarget(target, targets) {
    return targets.has(target) && Object.keys(targets.get(target)).length > 0;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/start.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startViewAnimation",
    ()=>startViewAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$BaseGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$PseudoAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/PseudoAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$convert$2d$options$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$choose$2d$layer$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/choose-layer-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$css$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/css.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$get$2d$layer$2d$name$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/get-layer-name.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$get$2d$view$2d$animations$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/get-view-animations.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$has$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/utils/has-target.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
const definitionNames = [
    "layout",
    "enter",
    "exit",
    "new",
    "old"
];
function startViewAnimation(update, defaultOptions, targets) {
    if (!document.startViewTransition) {
        return new Promise(async (resolve)=>{
            await update();
            resolve(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$BaseGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseGroupPlaybackControls"]([]));
        });
    }
    // TODO: Go over existing targets and ensure they all have ids
    /**
     * If we don't have any animations defined for the root target,
     * remove it from being captured.
     */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$has$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasTarget"])("root", targets)) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$css$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"].set(":root", {
            "view-transition-name": "none"
        });
    }
    /**
     * Set the timing curve to linear for all view transition layers.
     * This gets baked into the keyframes, which can't be changed
     * without breaking the generated animation.
     *
     * This allows us to set easing via updateTiming - which can be changed.
     */ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$css$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"].set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", {
        "animation-timing-function": "linear !important"
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$css$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"].commit(); // Write
    const transition = document.startViewTransition(async ()=>{
        await update();
    // TODO: Go over new targets and ensure they all have ids
    });
    transition.finished.finally(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$css$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"].remove(); // Write
    });
    return new Promise((resolve)=>{
        transition.ready.then(()=>{
            var _a;
            const generatedViewAnimations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$get$2d$view$2d$animations$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getViewAnimations"])();
            const animations = [];
            /**
             * Create animations for our definitions
             */ targets.forEach((definition, target)=>{
                // TODO: If target is not "root", resolve elements
                // and iterate over each
                for (const key of definitionNames){
                    if (!definition[key]) continue;
                    const { keyframes, options } = definition[key];
                    for (let [valueName, valueKeyframes] of Object.entries(keyframes)){
                        if (!valueKeyframes) continue;
                        const valueOptions = {
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueTransition"])(defaultOptions, valueName),
                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueTransition"])(options, valueName)
                        };
                        const type = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$choose$2d$layer$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chooseLayerType"])(key);
                        /**
                         * If this is an opacity animation, and keyframes are not an array,
                         * we need to convert them into an array and set an initial value.
                         */ if (valueName === "opacity" && !Array.isArray(valueKeyframes)) {
                            const initialValue = type === "new" ? 0 : 1;
                            valueKeyframes = [
                                initialValue,
                                valueKeyframes
                            ];
                        }
                        /**
                         * Resolve stagger function if provided.
                         */ if (typeof valueOptions.delay === "function") {
                            valueOptions.delay = valueOptions.delay(0, 1);
                        }
                        const animation = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$PseudoAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PseudoAnimation"](document.documentElement, `::view-transition-${type}(${target})`, valueName, valueKeyframes, valueOptions);
                        animations.push(animation);
                    }
                }
            });
            /**
             * Handle browser generated animations
             */ for (const animation of generatedViewAnimations){
                if (animation.playState === "finished") continue;
                const { effect } = animation;
                if (!effect || !(effect instanceof KeyframeEffect)) continue;
                const { pseudoElement } = effect;
                if (!pseudoElement) continue;
                const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$utils$2f$get$2d$layer$2d$name$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLayerName"])(pseudoElement);
                if (!name) continue;
                const targetDefinition = targets.get(name.layer);
                if (!targetDefinition) {
                    /**
                     * If transition name is group then update the timing of the animation
                     * whereas if it's old or new then we could possibly replace it using
                     * the above method.
                     */ const transitionName = name.type === "group" ? "layout" : "";
                    const animationTransition = {
                        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueTransition"])(defaultOptions, transitionName)
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$convert$2d$options$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyGeneratorOptions"])(animationTransition);
                    const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEasingToNativeEasing"])(animationTransition.ease, animationTransition.duration);
                    effect.updateTiming({
                        delay: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])((_a = animationTransition.delay) !== null && _a !== void 0 ? _a : 0),
                        duration: animationTransition.duration,
                        easing
                    });
                    animations.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimationControls"](animation));
                } else if (hasOpacity(targetDefinition, "enter") && hasOpacity(targetDefinition, "exit") && effect.getKeyframes().some((keyframe)=>keyframe.mixBlendMode)) {
                    animations.push(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimationControls"](animation));
                } else {
                    animation.cancel();
                }
            }
            resolve(new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$BaseGroup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BaseGroupPlaybackControls"](animations));
        });
    });
}
function hasOpacity(target, key) {
    var _a;
    return (_a = target === null || target === void 0 ? void 0 : target[key]) === null || _a === void 0 ? void 0 : _a.keyframes.opacity;
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ViewTransitionBuilder",
    ()=>ViewTransitionBuilder,
    "view",
    ()=>view
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$start$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/start.mjs [app-client] (ecmascript)");
;
;
/**
 * TODO:
 * - Create view transition on next tick
 * - Replace animations with Motion animations
 * - Return GroupAnimation on next tick
 */ class ViewTransitionBuilder {
    constructor(update, options = {}){
        this.currentTarget = "root";
        this.targets = new Map();
        this.notifyReady = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        this.readyPromise = new Promise((resolve)=>{
            this.notifyReady = resolve;
        });
        queueMicrotask(()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$start$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startViewAnimation"])(update, options, this.targets).then((animation)=>this.notifyReady(animation));
        });
    }
    get(selector) {
        this.currentTarget = selector;
        return this;
    }
    layout(keyframes, options) {
        this.updateTarget("layout", keyframes, options);
        return this;
    }
    new(keyframes, options) {
        this.updateTarget("new", keyframes, options);
        return this;
    }
    old(keyframes, options) {
        this.updateTarget("old", keyframes, options);
        return this;
    }
    enter(keyframes, options) {
        this.updateTarget("enter", keyframes, options);
        return this;
    }
    exit(keyframes, options) {
        this.updateTarget("exit", keyframes, options);
        return this;
    }
    crossfade(options) {
        this.updateTarget("enter", {
            opacity: 1
        }, options);
        this.updateTarget("exit", {
            opacity: 0
        }, options);
        return this;
    }
    updateTarget(target, keyframes, options = {}) {
        const { currentTarget, targets } = this;
        if (!targets.has(currentTarget)) {
            targets.set(currentTarget, {});
        }
        const targetData = targets.get(currentTarget);
        targetData[target] = {
            keyframes,
            options
        };
    }
    then(resolve, reject) {
        return this.readyPromise.then(resolve, reject);
    }
}
function view(update, defaultOptions = {}) {
    return new ViewTransitionBuilder(update, defaultOptions);
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setDragLock",
    ()=>setDragLock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)");
;
function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"][axis]) {
            return null;
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"][axis] = true;
            return ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"][axis] = false;
            };
        }
    } else {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].x || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].y) {
            return null;
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].x = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].y = true;
            return ()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].x = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDragging"].y = false;
            };
        }
    }
}
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$controls$2f$Group$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/controls/Group.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$NativeAnimationControls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$attach$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$hover$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/hover.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$press$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/press/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$resolve$2d$elements$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$view$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/view/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$is$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$drag$2f$state$2f$set$2d$active$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$node$2d$or$2d$child$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$gestures$2f$utils$2f$is$2d$primary$2d$pointer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupAnimation",
    ()=>GroupAnimation
]);
class GroupAnimation {
    constructor(animations){
        // Bound to accomadate common `return animation.stop` pattern
        this.stop = ()=>this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    get finished() {
        return Promise.all(this.animations.map((animation)=>animation.finished));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */ getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for(let i = 0; i < this.animations.length; i++){
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline) {
        const subscriptions = this.animations.map((animation)=>animation.attachTimeline(timeline));
        return ()=>{
            subscriptions.forEach((cancel, i)=>{
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get state() {
        return this.getAll("state");
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        return getMax(this.animations, "duration");
    }
    get iterationDuration() {
        return getMax(this.animations, "iterationDuration");
    }
    runAll(methodName) {
        this.animations.forEach((controls)=>controls[methodName]());
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}
function getMax(animations, propName) {
    let max = 0;
    for(let i = 0; i < animations.length; i++){
        const value = animations[i][propName];
        if (value !== null && value > max) {
            max = value;
        }
    }
    return max;
}
;
 //# sourceMappingURL=GroupAnimation.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupAnimationWithThen",
    ()=>GroupAnimationWithThen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$GroupAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs [app-client] (ecmascript)");
;
class GroupAnimationWithThen extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$GroupAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GroupAnimation"] {
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(()=>{});
    }
}
;
 //# sourceMappingURL=GroupAnimationWithThen.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateLinearEasing",
    ()=>generateLinearEasing
]);
const generateLinearEasing = (easing, duration, resolution = 10 // as milliseconds
)=>{
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for(let i = 0; i < numPoints; i++){
        points += Math.round(easing(i / (numPoints - 1)) * 10000) / 10000 + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};
;
 //# sourceMappingURL=linear.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */ __turbopack_context__.s([
    "calcGeneratorDuration",
    ()=>calcGeneratorDuration,
    "maxGeneratorDuration",
    ()=>maxGeneratorDuration
]);
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while(!state.done && duration < maxGeneratorDuration){
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}
;
 //# sourceMappingURL=calc-duration.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGeneratorEasing",
    ()=>createGeneratorEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)");
;
;
/**
 * Create a progress => progress easing function from a generator.
 */ function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({
        ...options,
        keyframes: [
            0,
            scale
        ]
    });
    const duration = Math.min((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorDuration"])(generator), __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxGeneratorDuration"]);
    return {
        type: "keyframes",
        ease: (progress)=>{
            return generator.next(duration * progress).value / scale;
        },
        duration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(duration)
    };
}
;
 //# sourceMappingURL=create-generator-easing.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcGeneratorVelocity",
    ()=>calcGeneratorVelocity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)");
;
const velocitySampleDuration = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["velocityPerSecond"])(current - resolveValue(prevT), t - prevT);
}
;
 //# sourceMappingURL=velocity.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/defaults.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "springDefaults",
    ()=>springDefaults
]);
const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    velocity: 0.0,
    // Default duration/bounce-based options
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    // Rest thresholds
    restSpeed: {
        granular: 0.01,
        default: 2
    },
    restDelta: {
        granular: 0.005,
        default: 0.5
    },
    // Limits
    minDuration: 0.01,
    maxDuration: 10.0,
    minDamping: 0.05,
    maxDamping: 1
};
;
 //# sourceMappingURL=defaults.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/find.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calcAngularFreq",
    ()=>calcAngularFreq,
    "findSpring",
    ()=>findSpring
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/defaults.mjs [app-client] (ecmascript)");
;
;
const safeMin = 0.001;
function findSpring({ duration = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].duration, bounce = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].bounce, velocity = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].velocity, mass = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].mass }) {
    let envelope;
    let derivative;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(duration <= (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let dampingRatio = 1 - bounce;
    /**
     * Restrict dampingRatio and duration to within acceptable ranges.
     */ dampingRatio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].minDamping, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].maxDamping, dampingRatio);
    duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].minDuration, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].maxDuration, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(duration));
    if (dampingRatio < 1) {
        /**
         * Underdamped spring
         */ envelope = (undampedFreq)=>{
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - a / b * c;
        };
        derivative = (undampedFreq)=>{
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return factor * ((d - e) * f) / g;
        };
    } else {
        /**
         * Critically-damped spring
         */ envelope = (undampedFreq)=>{
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq)=>{
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(duration);
    if (isNaN(undampedFreq)) {
        return {
            stiffness: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].stiffness,
            damping: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].damping,
            duration
        };
    } else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration
        };
    }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for(let i = 1; i < rootIterations; i++){
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}
;
 //# sourceMappingURL=find.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "spring",
    ()=>spring
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$velocity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/defaults.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/find.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
const durationKeys = [
    "duration",
    "bounce"
];
const physicsKeys = [
    "stiffness",
    "damping",
    "mass"
];
function isSpringType(options, keys) {
    return keys.some((key)=>options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = {
        velocity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].velocity,
        stiffness: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].stiffness,
        damping: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].damping,
        mass: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].mass,
        isResolvedFromDuration: false,
        ...options
    };
    // stiffness/damping/mass overrides duration/bounce
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
        if (options.visualDuration) {
            const visualDuration = options.visualDuration;
            const root = 2 * Math.PI / (visualDuration * 1.2);
            const stiffness = root * root;
            const damping = 2 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0.05, 1, 1 - (options.bounce || 0)) * Math.sqrt(stiffness);
            springOptions = {
                ...springOptions,
                mass: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].mass,
                stiffness,
                damping
            };
        } else {
            const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSpring"])(options);
            springOptions = {
                ...springOptions,
                ...derived,
                mass: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].mass
            };
            springOptions.isResolvedFromDuration = true;
        }
    }
    return springOptions;
}
function spring(optionsOrVisualDuration = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].visualDuration, bounce = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].bounce) {
    const options = typeof optionsOrVisualDuration !== "object" ? {
        visualDuration: optionsOrVisualDuration,
        keyframes: [
            0,
            1
        ],
        bounce
    } : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */ const state = {
        done: false,
        value: origin
    };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration } = getSpringOptions({
        ...options,
        velocity: -(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(options.velocity || 0)
    });
    const initialVelocity = velocity || 0.0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Math.sqrt(stiffness / mass));
    /**
     * If we're working on a granular scale, use smaller defaults for determining
     * when the spring is finished.
     *
     * These defaults have been selected emprically based on what strikes a good
     * ratio between feeling good and finishing as soon as changes are imperceptible.
     */ const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].restSpeed.granular : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].restSpeed.default);
    restDelta || (restDelta = isGranularScale ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].restDelta.granular : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["springDefaults"].restDelta.default);
    let resolveSpring;
    if (dampingRatio < 1) {
        const angularFreq = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcAngularFreq"])(undampedAngularFreq, dampingRatio);
        // Underdamped spring
        resolveSpring = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
        };
    } else if (dampingRatio === 1) {
        // Critically damped spring
        resolveSpring = (t)=>target - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
    } else {
        // Overdamped spring
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t)=>{
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            // When performing sinh or cosh values can hit Infinity so we cap them here
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return target - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
        };
    }
    const generator = {
        calculatedDuration: isResolvedFromDuration ? duration || null : null,
        next: (t)=>{
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                let currentVelocity = t === 0 ? initialVelocity : 0.0;
                /**
                 * We only need to calculate velocity for under-damped springs
                 * as over- and critically-damped springs can't overshoot, so
                 * checking only for displacement is enough.
                 */ if (dampingRatio < 1) {
                    currentVelocity = t === 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(initialVelocity) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$velocity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorVelocity"])(resolveSpring, t, current);
                }
                const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
                state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
            } else {
                state.done = t >= duration;
            }
            state.value = state.done ? target : current;
            return state;
        },
        toString: ()=>{
            const calculatedDuration = Math.min((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorDuration"])(generator), __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxGeneratorDuration"]);
            const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateLinearEasing"])((progress)=>generator.next(calculatedDuration * progress).value, calculatedDuration, 30);
            return calculatedDuration + "ms " + easing;
        },
        toTransition: ()=>{}
    };
    return generator;
}
spring.applyToOptions = (options)=>{
    const generatorOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$create$2d$generator$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGeneratorEasing"])(options, 100, spring);
    options.ease = generatorOptions.ease;
    options.duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(generatorOptions.duration);
    options.type = "keyframes";
    return options;
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isMotionValue",
    ()=>isMotionValue
]);
const isMotionValue = (value)=>Boolean(value && value.getVelocity);
;
 //# sourceMappingURL=is-motion-value.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/ __turbopack_context__.s([
    "mixNumber",
    ()=>mixNumber
]);
const mixNumber = (from, to, progress)=>{
    return from + (to - from) * progress;
};
;
 //# sourceMappingURL=number.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fillOffset",
    ()=>fillOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
;
;
function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for(let i = 1; i <= remaining; i++){
        const offsetProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progress"])(0, remaining, i);
        offset.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(min, 1, offsetProgress));
    }
}
;
 //# sourceMappingURL=fill.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultOffset",
    ()=>defaultOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs [app-client] (ecmascript)");
;
function defaultOffset(arr) {
    const offset = [
        0
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$fill$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fillOffset"])(offset, arr.length - 1);
    return offset;
}
;
 //# sourceMappingURL=default.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isGenerator",
    ()=>isGenerator
]);
function isGenerator(type) {
    return typeof type === "function" && "applyToOptions" in type;
}
;
 //# sourceMappingURL=is-generator.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/resolve-elements.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveElements",
    ()=>resolveElements
]);
function resolveElements(elementOrSelector, scope, selectorCache) {
    if (elementOrSelector == null) {
        return [];
    }
    if (elementOrSelector instanceof EventTarget) {
        return [
            elementOrSelector
        ];
    } else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            root = scope.current;
        }
        const elements = selectorCache?.[elementOrSelector] ?? root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector).filter((element)=>element != null);
}
;
 //# sourceMappingURL=resolve-elements.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/order.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stepsOrder",
    ()=>stepsOrder
]);
const stepsOrder = [
    "setup",
    "read",
    "resolveKeyframes",
    "preUpdate",
    "update",
    "preRender",
    "render",
    "postRender"
];
;
 //# sourceMappingURL=order.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "statsBuffer",
    ()=>statsBuffer
]);
const statsBuffer = {
    value: null,
    addProjectionMetrics: null
};
;
 //# sourceMappingURL=buffer.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/render-step.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRenderStep",
    ()=>createRenderStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)");
;
function createRenderStep(runNextFrame, stepName) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */ let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */ let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */ const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    let numCalls = 0;
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        numCalls++;
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */ schedule: (callback, keepAlive = false, immediate = false)=>{
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive) toKeepAlive.add(callback);
            if (!queue.has(callback)) queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */ cancel: (callback)=>{
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */ process: (frameData)=>{
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */ if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [thisFrame, nextFrame] = [
                nextFrame,
                thisFrame
            ];
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            /**
             * If we're recording stats then
             */ if (stepName && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value.frameloop[stepName].push(numCalls);
            }
            numCalls = 0;
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        }
    };
    return step;
}
;
 //# sourceMappingURL=render-step.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRenderBatcher",
    ()=>createRenderBatcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/order.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/render-step.mjs [app-client] (ecmascript)");
;
;
;
const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false
    };
    const flagRunNextFrame = ()=>runNextFrame = true;
    const steps = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].reduce((acc, key)=>{
        acc[key] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$render$2d$step$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderStep"])(flagRunNextFrame, allowKeepAlive ? key : undefined);
        return acc;
    }, {});
    const { setup, read, resolveKeyframes, preUpdate, update, preRender, render, postRender } = steps;
    const processBatch = ()=>{
        const timestamp = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming ? state.timestamp : performance.now();
        runNextFrame = false;
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming) {
            state.delta = useDefaultElapsed ? 1000 / 60 : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        setup.process(state);
        read.process(state);
        resolveKeyframes.process(state);
        preUpdate.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = ()=>{
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].reduce((acc, key)=>{
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false)=>{
            if (!runNextFrame) wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process)=>{
        for(let i = 0; i < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"].length; i++){
            steps[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$order$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepsOrder"][i]].cancel(process);
        }
    };
    return {
        schedule,
        cancel,
        state,
        steps
    };
}
;
 //# sourceMappingURL=batcher.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelFrame",
    ()=>cancelFrame,
    "frame",
    ()=>frame,
    "frameData",
    ()=>frameData,
    "frameSteps",
    ()=>frameSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)");
;
;
const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderBatcher"])(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"], true);
;
 //# sourceMappingURL=frame.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "time",
    ()=>time
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */ const time = {
    now: ()=>{
        if (now === undefined) {
            time.set(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].isProcessing || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].useManualTiming ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].timestamp : performance.now());
        }
        return now;
    },
    set: (newTime)=>{
        now = newTime;
        queueMicrotask(clearTime);
    }
};
;
 //# sourceMappingURL=sync-time.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "activeAnimations",
    ()=>activeAnimations
]);
const activeAnimations = {
    layout: 0,
    mainThread: 0,
    waapi: 0
};
;
 //# sourceMappingURL=animation-count.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "containsCSSVariable",
    ()=>containsCSSVariable,
    "isCSSVariableName",
    ()=>isCSSVariableName,
    "isCSSVariableToken",
    ()=>isCSSVariableToken
]);
const checkStringStartsWith = (token)=>(key)=>typeof key === "string" && key.startsWith(token);
const isCSSVariableName = /*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = /*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value)=>{
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken) return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
/**
 * Check if a value contains a CSS variable anywhere (e.g. inside calc()).
 * Unlike isCSSVariableToken which checks if the value IS a var() token,
 * this checks if the value CONTAINS var() somewhere in the string.
 */ function containsCSSVariable(value) {
    if (typeof value !== "string") return false;
    // Strip comments to avoid false positives
    return value.split("/*")[0].includes("var(--");
}
;
 //# sourceMappingURL=is-css-variable.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "alpha",
    ()=>alpha,
    "number",
    ()=>number,
    "scale",
    ()=>scale
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
;
const number = {
    test: (v)=>typeof v === "number",
    parse: parseFloat,
    transform: (v)=>v
};
const alpha = {
    ...number,
    transform: (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 1, v)
};
const scale = {
    ...number,
    default: 1
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// If this number is a decimal, make it just five decimal places
// to avoid exponents
__turbopack_context__.s([
    "sanitize",
    ()=>sanitize
]);
const sanitize = (v)=>Math.round(v * 100000) / 100000;
;
 //# sourceMappingURL=sanitize.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "floatRegex",
    ()=>floatRegex
]);
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
;
 //# sourceMappingURL=float-regex.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNullish",
    ()=>isNullish
]);
function isNullish(v) {
    return v == null;
}
;
 //# sourceMappingURL=is-nullish.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "singleColorRegex",
    ()=>singleColorRegex
]);
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;
;
 //# sourceMappingURL=single-color-regex.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isColorString",
    ()=>isColorString,
    "splitColor",
    ()=>splitColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$is$2d$nullish$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$single$2d$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */ const isColorString = (type, testProp)=>(v)=>{
        return Boolean(typeof v === "string" && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$single$2d$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["singleColorRegex"].test(v) && v.startsWith(type) || testProp && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$is$2d$nullish$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNullish"])(v) && Object.prototype.hasOwnProperty.call(v, testProp));
    };
const splitColor = (aName, bName, cName)=>(v)=>{
        if (typeof v !== "string") return v;
        const [a, b, c, alpha] = v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"]);
        return {
            [aName]: parseFloat(a),
            [bName]: parseFloat(b),
            [cName]: parseFloat(c),
            alpha: alpha !== undefined ? parseFloat(alpha) : 1
        };
    };
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rgbUnit",
    ()=>rgbUnit,
    "rgba",
    ()=>rgba
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
;
;
const clampRgbUnit = (v)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 255, v);
const rgbUnit = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    transform: (v)=>Math.round(clampRgbUnit(v))
};
const rgba = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("rgb", "red"),
    parse: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitColor"])("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 })=>"rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")"
};
;
 //# sourceMappingURL=rgba.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hex",
    ()=>hex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
    // Or we have 3 characters, ie #F00
    } else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1
    };
}
const hex = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("#"),
    parse: parseHex,
    transform: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].transform
};
;
 //# sourceMappingURL=hex.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*#__NO_SIDE_EFFECTS__*/ __turbopack_context__.s([
    "degrees",
    ()=>degrees,
    "percent",
    ()=>percent,
    "progressPercentage",
    ()=>progressPercentage,
    "px",
    ()=>px,
    "vh",
    ()=>vh,
    "vw",
    ()=>vw
]);
const createUnitType = (unit)=>({
        test: (v)=>typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
        parse: parseFloat,
        transform: (v)=>`${v}${unit}`
    });
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = /*@__PURE__*/ (()=>({
        ...percent,
        parse: (v)=>percent.parse(v) / 100,
        transform: (v)=>percent.transform(v * 100)
    }))();
;
 //# sourceMappingURL=units.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "hsla",
    ()=>hsla
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/utils.mjs [app-client] (ecmascript)");
;
;
;
;
const hsla = {
    test: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isColorString"])("hsl", "hue"),
    parse: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitColor"])("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 })=>{
        return "hsla(" + Math.round(hue) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(saturation)) + ", " + __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"].transform((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(lightness)) + ", " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"].transform(alpha$1)) + ")";
    }
};
;
 //# sourceMappingURL=hsla.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "color",
    ()=>color
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)");
;
;
;
const color = {
    test: (v)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].test(v) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].test(v),
    parse: (v)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].parse(v);
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].test(v)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].parse(v);
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].parse(v);
        }
    },
    transform: (v)=>{
        return typeof v === "string" ? v : v.hasOwnProperty("red") ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].transform(v) : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"].transform(v);
    },
    getAnimatableNone: (v)=>{
        const parsed = color.parse(v);
        parsed.alpha = 0;
        return color.transform(parsed);
    }
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "colorRegex",
    ()=>colorRegex
]);
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
;
 //# sourceMappingURL=color-regex.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyseComplexValue",
    ()=>analyseComplexValue,
    "complex",
    ()=>complex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/color-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/sanitize.mjs [app-client] (ecmascript)");
;
;
;
;
function test(v) {
    return isNaN(v) && typeof v === "string" && (v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"])?.length || 0) + (v.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$color$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorRegex"])?.length || 0) > 0;
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: []
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue)=>{
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].parse(parsedValue));
        } else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        } else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return {
        values,
        split,
        indexes,
        types
    };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function createTransformer(source) {
    const { split, types } = analyseComplexValue(source);
    const numSections = split.length;
    return (v)=>{
        let output = "";
        for(let i = 0; i < numSections; i++){
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$sanitize$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sanitize"])(v[i]);
                } else if (type === COLOR_TOKEN) {
                    output += __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].transform(v[i]);
                } else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
const convertNumbersToZero = (v)=>typeof v === "number" ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(v) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].getAnimatableNone(v) : v;
function getAnimatableNone(v) {
    const parsed = parseComplexValue(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone
};
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Adapted from https://gist.github.com/mjackson/5311256
__turbopack_context__.s([
    "hslaToRgba",
    ()=>hslaToRgba
]);
function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    } else {
        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha
    };
}
;
 //# sourceMappingURL=hsla-to-rgba.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/immediate.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mixImmediate",
    ()=>mixImmediate
]);
function mixImmediate(a, b) {
    return (p)=>p > 0 ? b : a;
}
;
 //# sourceMappingURL=immediate.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/color.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mixColor",
    ()=>mixColor,
    "mixLinearColor",
    ()=>mixLinearColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hsla.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2d$to$2d$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/rgba.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/immediate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v)=>{
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"]
];
const getColorType = (v)=>colorTypes.find((type)=>type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable");
    if (!Boolean(type)) return false;
    let model = type.parse(color);
    if (type === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hsla"]) {
        // TODO Remove this cast - needed since Motion's stricter typing
        model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$hsla$2d$to$2d$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hslaToRgba"])(model);
    }
    return model;
}
const mixColor = (from, to)=>{
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixImmediate"])(from, to);
    }
    const blended = {
        ...fromRGBA
    };
    return (v)=>{
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(fromRGBA.alpha, toRGBA.alpha, v);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$rgba$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rgba"].transform(blended);
    };
};
;
 //# sourceMappingURL=color.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/visibility.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "invisibleValues",
    ()=>invisibleValues,
    "mixVisibility",
    ()=>mixVisibility
]);
const invisibleValues = new Set([
    "none",
    "hidden"
]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */ function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p)=>p <= 0 ? origin : target;
    } else {
        return (p)=>p >= 1 ? target : origin;
    }
}
;
 //# sourceMappingURL=visibility.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/complex.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMixer",
    ()=>getMixer,
    "mixArray",
    ()=>mixArray,
    "mixComplex",
    ()=>mixComplex,
    "mixObject",
    ()=>mixObject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/color.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/immediate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/visibility.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function mixNumber(a, b) {
    return (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber;
    } else if (typeof a === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixImmediate"] : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"] : mixComplex;
    } else if (Array.isArray(a)) {
        return mixArray;
    } else if (typeof a === "object") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"].test(a) ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$color$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixColor"] : mixObject;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixImmediate"];
}
function mixArray(a, b) {
    const output = [
        ...a
    ];
    const numValues = output.length;
    const blendValue = a.map((v, i)=>getMixer(v)(v, b[i]));
    return (p)=>{
        for(let i = 0; i < numValues; i++){
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = {
        ...a,
        ...b
    };
    const blendValue = {};
    for(const key in output){
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v)=>{
        for(const key in blendValue){
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    const orderedOrigin = [];
    const pointers = {
        color: 0,
        var: 0,
        number: 0
    };
    for(let i = 0; i < target.values.length; i++){
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = origin.values[originIndex] ?? 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target)=>{
    const template = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].createTransformer(target);
    const originStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyseComplexValue"])(origin);
    const targetStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyseComplexValue"])(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length && originStats.indexes.color.length === targetStats.indexes.color.length && originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invisibleValues"].has(origin) && !targetStats.values.length || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invisibleValues"].has(target) && !originStats.values.length) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$visibility$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixVisibility"])(origin, target);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$immediate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixImmediate"])(origin, target);
    }
};
;
 //# sourceMappingURL=complex.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mix",
    ()=>mix
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$complex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/complex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
;
;
function mix(from, to, p) {
    if (typeof from === "number" && typeof to === "number" && typeof p === "number") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(from, to, p);
    }
    const mixer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$complex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMixer"])(from);
    return mixer(from, to);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/drivers/frame.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "frameloopDriver",
    ()=>frameloopDriver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
const frameloopDriver = (update)=>{
    const passTimestamp = ({ timestamp })=>update(timestamp);
    return {
        start: (keepAlive = true)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].update(passTimestamp, keepAlive),
        stop: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(passTimestamp),
        /**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */ now: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].isProcessing ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameData"].timestamp : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now()
    };
};
;
 //# sourceMappingURL=frame.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/inertia.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inertia",
    ()=>inertia
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$velocity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs [app-client] (ecmascript)");
;
;
function inertia({ keyframes, velocity = 0.0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed }) {
    const origin = keyframes[0];
    const state = {
        done: false,
        value: origin
    };
    const isOutOfBounds = (v)=>min !== undefined && v < min || max !== undefined && v > max;
    const nearestBoundary = (v)=>{
        if (min === undefined) return max;
        if (max === undefined) return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    /**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */ if (target !== ideal) amplitude = target - origin;
    const calcDelta = (t)=>-amplitude * Math.exp(-t / timeConstant);
    const calcLatest = (t)=>target + calcDelta(t);
    const applyFriction = (t)=>{
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDelta;
        state.value = state.done ? target : latest;
    };
    /**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */ let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t)=>{
        if (!isOutOfBounds(state.value)) return;
        timeReachedBoundary = t;
        spring$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spring"])({
            keyframes: [
                state.value,
                nearestBoundary(state.value)
            ],
            velocity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$velocity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorVelocity"])(calcLatest, t, state.value),
            damping: bounceDamping,
            stiffness: bounceStiffness,
            restDelta,
            restSpeed
        });
    };
    checkCatchBoundary(0);
    return {
        calculatedDuration: null,
        next: (t)=>{
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */ let hasUpdatedFrame = false;
            if (!spring$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */ if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
                return spring$1.next(t - timeReachedBoundary);
            } else {
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        }
    };
}
;
 //# sourceMappingURL=inertia.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/interpolate.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "interpolate",
    ()=>interpolate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/progress.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/index.mjs [app-client] (ecmascript)");
;
;
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].mix || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mix"];
    const numMixers = output.length - 1;
    for(let i = 0; i < numMixers; i++){
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"] : ease;
            mixer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revisit this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */ function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(inputLength === output.length, "Both input and output ranges must be the same length", "range-length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */ if (inputLength === 1) return ()=>output[0];
    if (inputLength === 2 && output[0] === output[1]) return ()=>output[1];
    const isZeroDeltaRange = input[0] === input[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [
            ...input
        ].reverse();
        output = [
            ...output
        ].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v)=>{
        if (isZeroDeltaRange && v < input[0]) return output[0];
        let i = 0;
        if (numMixers > 1) {
            for(; i < input.length - 2; i++){
                if (v < input[i + 1]) break;
            }
        }
        const progressInRange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$progress$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progress"])(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp ? (v)=>interpolator((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(input[0], input[inputLength - 1], v)) : interpolator;
}
;
 //# sourceMappingURL=interpolate.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertOffsetToTimes",
    ()=>convertOffsetToTimes
]);
function convertOffsetToTimes(offset, duration) {
    return offset.map((o)=>o * duration);
}
;
 //# sourceMappingURL=time.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultEasing",
    ()=>defaultEasing,
    "keyframes",
    ()=>keyframes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/ease.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$easing$2d$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/utils/is-easing-array.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/utils/map.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/interpolate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs [app-client] (ecmascript)");
;
;
;
;
function defaultEasing(values, easing) {
    return values.map(()=>easing || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$ease$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOut"]).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut" }) {
    /**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */ const easingFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$easing$2d$array$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isEasingArray"])(ease) ? ease.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easingDefinitionToFunction"]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easingDefinitionToFunction"])(ease);
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */ const state = {
        done: false,
        value: keyframeValues[0]
    };
    /**
     * Create a times array based on the provided 0-1 offsets
     */ const absoluteTimes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertOffsetToTimes"])(// Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length ? times : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$offsets$2f$default$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultOffset"])(keyframeValues), duration);
    const mapTimeToKeyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$interpolate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interpolate"])(absoluteTimes, keyframeValues, {
        ease: Array.isArray(easingFunctions) ? easingFunctions : defaultEasing(keyframeValues, easingFunctions)
    });
    return {
        calculatedDuration: duration,
        next: (t)=>{
            state.value = mapTimeToKeyframe(t);
            state.done = t >= duration;
            return state;
        }
    };
}
;
 //# sourceMappingURL=keyframes.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFinalKeyframe",
    ()=>getFinalKeyframe
]);
const isNotNull = (value)=>value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe, speed = 1) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const useFirstKeyframe = speed < 0 || repeat && repeatType !== "loop" && repeat % 2 === 1;
    const index = useFirstKeyframe ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined ? resolvedKeyframes[index] : finalKeyframe;
}
;
 //# sourceMappingURL=get-final.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "replaceTransitionType",
    ()=>replaceTransitionType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$inertia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/inertia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/spring/index.mjs [app-client] (ecmascript)");
;
;
;
const transitionTypeMap = {
    decay: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$inertia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inertia"],
    inertia: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$inertia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inertia"],
    tween: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"],
    keyframes: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"],
    spring: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$spring$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["spring"]
};
function replaceTransitionType(transition) {
    if (typeof transition.type === "string") {
        transition.type = transitionTypeMap[transition.type];
    }
}
;
 //# sourceMappingURL=replace-transition-type.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WithPromise",
    ()=>WithPromise
]);
class WithPromise {
    constructor(){
        this.updateFinished();
    }
    get finished() {
        return this._finished;
    }
    updateFinished() {
        this._finished = new Promise((resolve)=>{
            this.resolve = resolve;
        });
    }
    notifyFinished() {
        this.resolve();
    }
    /**
     * Allows the animation to be awaited.
     *
     * @deprecated Use `finished` instead.
     */ then(onResolve, onReject) {
        return this.finished.then(onResolve, onReject);
    }
}
;
 //# sourceMappingURL=WithPromise.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JSAnimation",
    ()=>JSAnimation,
    "animateValue",
    ()=>animateValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/pipe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$drivers$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/drivers/frame.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$inertia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/inertia.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
const percentToProgress = (percent)=>percent / 100;
class JSAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor(options){
        super();
        this.state = "idle";
        this.startTime = null;
        this.isStopped = false;
        /**
         * The current time of the animation.
         */ this.currentTime = 0;
        /**
         * The time at which the animation was paused.
         */ this.holdTime = null;
        /**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */ this.playbackSpeed = 1;
        /**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */ this.stop = ()=>{
            const { motionValue } = this.options;
            if (motionValue && motionValue.updatedAt !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now()) {
                this.tick(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now());
            }
            this.isStopped = true;
            if (this.state === "idle") return;
            this.teardown();
            this.options.onStop?.();
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].mainThread++;
        this.options = options;
        this.initAnimation();
        this.play();
        if (options.autoplay === false) this.pause();
    }
    initAnimation() {
        const { options } = this;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceTransitionType"])(options);
        const { type = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"], repeat = 0, repeatDelay = 0, repeatType, velocity = 0 } = options;
        let { keyframes: keyframes$1 } = options;
        const generatorFactory = type || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"];
        if (("TURBOPACK compile-time value", "development") !== "production" && generatorFactory !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`, "spring-two-frames");
        }
        if (generatorFactory !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$keyframes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"] && typeof keyframes$1[0] !== "number") {
            this.mixKeyframes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$pipe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pipe"])(percentToProgress, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mix"])(keyframes$1[0], keyframes$1[1]));
            keyframes$1 = [
                0,
                100
            ];
        }
        const generator = generatorFactory({
            ...options,
            keyframes: keyframes$1
        });
        /**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */ if (repeatType === "mirror") {
            this.mirroredGenerator = generatorFactory({
                ...options,
                keyframes: [
                    ...keyframes$1
                ].reverse(),
                velocity: -velocity
            });
        }
        /**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */ if (generator.calculatedDuration === null) {
            generator.calculatedDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$calc$2d$duration$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calcGeneratorDuration"])(generator);
        }
        const { calculatedDuration } = generator;
        this.calculatedDuration = calculatedDuration;
        this.resolvedDuration = calculatedDuration + repeatDelay;
        this.totalDuration = this.resolvedDuration * (repeat + 1) - repeatDelay;
        this.generator = generator;
    }
    updateTime(timestamp) {
        const animationTime = Math.round(timestamp - this.startTime) * this.playbackSpeed;
        // Update currentTime
        if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        } else {
            // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
            // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
            // example.
            this.currentTime = animationTime;
        }
    }
    tick(timestamp, sample = false) {
        const { generator, totalDuration, mixKeyframes, mirroredGenerator, resolvedDuration, calculatedDuration } = this;
        if (this.startTime === null) return generator.next(0);
        const { delay = 0, keyframes, repeat, repeatType, repeatDelay, type, onUpdate, finalKeyframe } = this.options;
        /**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */ if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, timestamp);
        } else if (this.speed < 0) {
            this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
        }
        if (sample) {
            this.currentTime = timestamp;
        } else {
            this.updateTime(timestamp);
        }
        // Rebase on delay
        const timeWithoutDelay = this.currentTime - delay * (this.playbackSpeed >= 0 ? 1 : -1);
        const isInDelayPhase = this.playbackSpeed >= 0 ? timeWithoutDelay < 0 : timeWithoutDelay > totalDuration;
        this.currentTime = Math.max(timeWithoutDelay, 0);
        // If this animation has finished, set the current time  to the total duration.
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let elapsed = this.currentTime;
        let frameGenerator = generator;
        if (repeat) {
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */ const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */ let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */ let iterationProgress = progress % 1.0;
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */ if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            iterationProgress === 1 && currentIteration--;
            currentIteration = Math.min(currentIteration, repeat + 1);
            /**
             * Reverse progress if we're not running in "normal" direction
             */ const isOddIteration = Boolean(currentIteration % 2);
            if (isOddIteration) {
                if (repeatType === "reverse") {
                    iterationProgress = 1 - iterationProgress;
                    if (repeatDelay) {
                        iterationProgress -= repeatDelay / resolvedDuration;
                    }
                } else if (repeatType === "mirror") {
                    frameGenerator = mirroredGenerator;
                }
            }
            elapsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, 1, iterationProgress) * resolvedDuration;
        }
        /**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */ const state = isInDelayPhase ? {
            done: false,
            value: keyframes[0]
        } : frameGenerator.next(elapsed);
        if (mixKeyframes) {
            state.value = mixKeyframes(state.value);
        }
        let { done } = state;
        if (!isInDelayPhase && calculatedDuration !== null) {
            done = this.playbackSpeed >= 0 ? this.currentTime >= totalDuration : this.currentTime <= 0;
        }
        const isAnimationFinished = this.holdTime === null && (this.state === "finished" || this.state === "running" && done);
        // TODO: The exception for inertia could be cleaner here
        if (isAnimationFinished && type !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$inertia$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inertia"]) {
            state.value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, this.options, finalKeyframe, this.speed);
        }
        if (onUpdate) {
            onUpdate(state.value);
        }
        if (isAnimationFinished) {
            this.finish();
        }
        return state;
    }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */ then(resolve, reject) {
        return this.finished.then(resolve, reject);
    }
    get duration() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(this.calculatedDuration);
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(delay);
    }
    get time() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(this.currentTime);
    }
    set time(newTime) {
        newTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(newTime);
        this.currentTime = newTime;
        if (this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0) {
            this.holdTime = newTime;
        } else if (this.driver) {
            this.startTime = this.driver.now() - newTime / this.playbackSpeed;
        }
        this.driver?.start(false);
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(newSpeed) {
        this.updateTime(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now());
        const hasChanged = this.playbackSpeed !== newSpeed;
        this.playbackSpeed = newSpeed;
        if (hasChanged) {
            this.time = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(this.currentTime);
        }
    }
    play() {
        if (this.isStopped) return;
        const { driver = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$drivers$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameloopDriver"], startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((timestamp)=>this.tick(timestamp));
        }
        this.options.onPlay?.();
        const now = this.driver.now();
        if (this.state === "finished") {
            this.updateFinished();
            this.startTime = now;
        } else if (this.holdTime !== null) {
            this.startTime = now - this.holdTime;
        } else if (!this.startTime) {
            this.startTime = startTime ?? now;
        }
        if (this.state === "finished" && this.speed < 0) {
            this.startTime += this.calculatedDuration;
        }
        this.holdTime = null;
        /**
         * Set playState to running only after we've used it in
         * the previous logic.
         */ this.state = "running";
        this.driver.start();
    }
    pause() {
        this.state = "paused";
        this.updateTime(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now());
        this.holdTime = this.currentTime;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.notifyFinished();
        this.teardown();
        this.state = "finished";
        this.options.onComplete?.();
    }
    cancel() {
        this.holdTime = null;
        this.startTime = 0;
        this.tick(0);
        this.teardown();
        this.options.onCancel?.();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.startTime = this.holdTime = null;
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].mainThread--;
    }
    stopDriver() {
        if (!this.driver) return;
        this.driver.stop();
        this.driver = undefined;
    }
    sample(sampleTime) {
        this.startTime = 0;
        return this.tick(sampleTime, true);
    }
    attachTimeline(timeline) {
        if (this.options.allowFlatten) {
            this.options.type = "keyframes";
            this.options.ease = "linear";
            this.initAnimation();
        }
        this.driver?.stop();
        return timeline.observe(this);
    }
}
// Legacy function support
function animateValue(options) {
    return new JSAnimation(options);
}
;
 //# sourceMappingURL=JSAnimation.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fillWildcards",
    ()=>fillWildcards
]);
function fillWildcards(keyframes) {
    for(let i = 1; i < keyframes.length; i++){
        keyframes[i] ?? (keyframes[i] = keyframes[i - 1]);
    }
}
;
 //# sourceMappingURL=fill-wildcards.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultTransformValue",
    ()=>defaultTransformValue,
    "parseValueFromTransform",
    ()=>parseValueFromTransform,
    "readTransformValue",
    ()=>readTransformValue
]);
const radToDeg = (rad)=>rad * 180 / Math.PI;
const rotate = (v)=>{
    const angle = radToDeg(Math.atan2(v[1], v[0]));
    return rebaseAngle(angle);
};
const matrix2dParsers = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (v)=>(Math.abs(v[0]) + Math.abs(v[3])) / 2,
    rotate,
    rotateZ: rotate,
    skewX: (v)=>radToDeg(Math.atan(v[1])),
    skewY: (v)=>radToDeg(Math.atan(v[2])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[2])) / 2
};
const rebaseAngle = (angle)=>{
    angle = angle % 360;
    if (angle < 0) angle += 360;
    return angle;
};
const rotateZ = rotate;
const scaleX = (v)=>Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const scaleY = (v)=>Math.sqrt(v[4] * v[4] + v[5] * v[5]);
const matrix3dParsers = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX,
    scaleY,
    scale: (v)=>(scaleX(v) + scaleY(v)) / 2,
    rotateX: (v)=>rebaseAngle(radToDeg(Math.atan2(v[6], v[5]))),
    rotateY: (v)=>rebaseAngle(radToDeg(Math.atan2(-v[2], v[0]))),
    rotateZ,
    rotate: rotateZ,
    skewX: (v)=>radToDeg(Math.atan(v[4])),
    skewY: (v)=>radToDeg(Math.atan(v[1])),
    skew: (v)=>(Math.abs(v[1]) + Math.abs(v[4])) / 2
};
function defaultTransformValue(name) {
    return name.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(transform, name) {
    if (!transform || transform === "none") {
        return defaultTransformValue(name);
    }
    const matrix3dMatch = transform.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let parsers;
    let match;
    if (matrix3dMatch) {
        parsers = matrix3dParsers;
        match = matrix3dMatch;
    } else {
        const matrix2dMatch = transform.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        parsers = matrix2dParsers;
        match = matrix2dMatch;
    }
    if (!match) {
        return defaultTransformValue(name);
    }
    const valueParser = parsers[name];
    const values = match[1].split(",").map(convertTransformToNumber);
    return typeof valueParser === "function" ? valueParser(values) : values[valueParser];
}
const readTransformValue = (instance, name)=>{
    const { transform = "none" } = getComputedStyle(instance);
    return parseValueFromTransform(transform, name);
};
function convertTransformToNumber(value) {
    return parseFloat(value.trim());
}
;
 //# sourceMappingURL=parse-transform.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Generate a list of every possible transform key.
 */ __turbopack_context__.s([
    "transformPropOrder",
    ()=>transformPropOrder,
    "transformProps",
    ()=>transformProps
]);
const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY"
];
/**
 * A quick lookup for transform props.
 */ const transformProps = /*@__PURE__*/ (()=>new Set(transformPropOrder))();
;
 //# sourceMappingURL=keys-transform.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNumOrPxType",
    ()=>isNumOrPxType,
    "positionalValues",
    ()=>positionalValues,
    "removeNonTranslationalTransform",
    ()=>removeNonTranslationalTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
;
;
;
const isNumOrPxType = (v)=>v === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"] || v === __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"];
const transformKeys = new Set([
    "x",
    "y",
    "z"
]);
const nonTranslationalTransformKeys = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].filter((key)=>!transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key)=>{
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([
                key,
                value.get()
            ]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0" })=>x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y }, { paddingTop = "0", paddingBottom = "0" })=>y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (_bbox, { top })=>parseFloat(top),
    left: (_bbox, { left })=>parseFloat(left),
    bottom: ({ y }, { top })=>parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left })=>parseFloat(left) + (x.max - x.min),
    // Transform
    x: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "x"),
    y: (_bbox, { transform })=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseValueFromTransform"])(transform, "y")
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;
;
 //# sourceMappingURL=unit-conversion.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KeyframeResolver",
    ()=>KeyframeResolver,
    "flushKeyframeResolvers",
    ()=>flushKeyframeResolvers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
let isForced = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver)=>resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver)=>resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */ elementsToMeasure.forEach((element)=>{
            const removedTransforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeNonTranslationalTransform"])(element);
            if (!removedTransforms.length) return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element)=>{
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value])=>{
                    element.getValue(key)?.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver)=>resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver)=>{
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver)=>resolver.complete(isForced));
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver)=>{
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    isForced = true;
    readAllKeyframes();
    measureAllKeyframes();
    isForced = false;
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false){
        this.state = "pending";
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */ this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */ this.needsMeasurement = false;
        this.unresolvedKeyframes = [
            ...unresolvedKeyframes
        ];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.state = "scheduled";
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].read(readAllKeyframes);
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].resolveKeyframes(measureAllKeyframes);
            }
        } else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        // If initial keyframe is null we need to read it from the DOM
        if (unresolvedKeyframes[0] === null) {
            const currentValue = motionValue?.get();
            // TODO: This doesn't work if the final keyframe is a wildcard
            const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
            if (currentValue !== undefined) {
                unresolvedKeyframes[0] = currentValue;
            } else if (element && name) {
                const valueAsRead = element.readValue(name, finalKeyframe);
                if (valueAsRead !== undefined && valueAsRead !== null) {
                    unresolvedKeyframes[0] = valueAsRead;
                }
            }
            if (unresolvedKeyframes[0] === undefined) {
                unresolvedKeyframes[0] = finalKeyframe;
            }
            if (motionValue && currentValue === undefined) {
                motionValue.set(unresolvedKeyframes[0]);
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$fill$2d$wildcards$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fillWildcards"])(unresolvedKeyframes);
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(isForcedComplete = false) {
        this.state = "complete";
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, isForcedComplete);
        toResolve.delete(this);
    }
    cancel() {
        if (this.state === "scheduled") {
            toResolve.delete(this);
            this.state = "pending";
        }
    }
    resume() {
        if (this.state === "pending") this.scheduleResolve();
    }
}
;
 //# sourceMappingURL=KeyframesResolver.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCSSVar",
    ()=>isCSSVar
]);
const isCSSVar = (name)=>name.startsWith("--");
;
 //# sourceMappingURL=is-css-var.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setStyle",
    ()=>setStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs [app-client] (ecmascript)");
;
function setStyle(element, name, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$is$2d$css$2d$var$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVar"])(name) ? element.style.setProperty(name, value) : element.style[name] = value;
}
;
 //# sourceMappingURL=style-set.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsScrollTimeline",
    ()=>supportsScrollTimeline
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
;
const supportsScrollTimeline = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(()=>window.ScrollTimeline !== undefined);
;
 //# sourceMappingURL=scroll-timeline.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */ __turbopack_context__.s([
    "supportsFlags",
    ()=>supportsFlags
]);
const supportsFlags = {};
;
 //# sourceMappingURL=flags.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoSupports",
    ()=>memoSupports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/flags.mjs [app-client] (ecmascript)");
;
;
function memoSupports(callback, supportsFlag) {
    const memoized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(callback);
    return ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$flags$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsFlags"][supportsFlag] ?? memoized();
}
;
 //# sourceMappingURL=memo.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsLinearEasing",
    ()=>supportsLinearEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/memo.mjs [app-client] (ecmascript)");
;
const supportsLinearEasing = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memoSupports"])(()=>{
    try {
        document.createElement("div").animate({
            opacity: 0
        }, {
            easing: "linear(0, 1)"
        });
    } catch (e) {
        return false;
    }
    return true;
}, "linearEasing");
;
 //# sourceMappingURL=linear-easing.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cubicBezierAsString",
    ()=>cubicBezierAsString
]);
const cubicBezierAsString = ([a, b, c, d])=>`cubic-bezier(${a}, ${b}, ${c}, ${d})`;
;
 //# sourceMappingURL=cubic-bezier.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportedWaapiEasing",
    ()=>supportedWaapiEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)");
;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0,
        0.65,
        0.55,
        1
    ]),
    circOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.55,
        0,
        1,
        0.45
    ]),
    backIn: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.31,
        0.01,
        0.66,
        -0.59
    ]),
    backOut: /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])([
        0.33,
        1.53,
        0.69,
        0.99
    ])
};
;
 //# sourceMappingURL=supported.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapEasingToNativeEasing",
    ()=>mapEasingToNativeEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/cubic-bezier.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/supported.mjs [app-client] (ecmascript)");
;
;
;
;
;
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    } else if (typeof easing === "function") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])() ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$linear$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateLinearEasing"])(easing, duration) : "ease-out";
    } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$utils$2f$is$2d$bezier$2d$definition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBezierDefinition"])(easing)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$cubic$2d$bezier$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cubicBezierAsString"])(easing);
    } else if (Array.isArray(easing)) {
        return easing.map((segmentEasing)=>mapEasingToNativeEasing(segmentEasing, duration) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportedWaapiEasing"].easeOut);
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$supported$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportedWaapiEasing"][easing];
    }
}
;
 //# sourceMappingURL=map-easing.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "startWaapiAnimation",
    ()=>startWaapiAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/animation-count.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/stats/buffer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs [app-client] (ecmascript)");
;
;
;
function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeOut", times } = {}, pseudoElement = undefined) {
    const keyframeOptions = {
        [valueName]: keyframes
    };
    if (times) keyframeOptions.offset = times;
    const easing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$easing$2f$map$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapEasingToNativeEasing"])(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */ if (Array.isArray(easing)) keyframeOptions.easing = easing;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].waapi++;
    }
    const options = {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal"
    };
    if (pseudoElement) options.pseudoElement = pseudoElement;
    const animation = element.animate(keyframeOptions, options);
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$buffer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["statsBuffer"].value) {
        animation.finished.finally(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$stats$2f$animation$2d$count$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeAnimations"].waapi--;
        });
    }
    return animation;
}
;
 //# sourceMappingURL=start-waapi-animation.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyGeneratorOptions",
    ()=>applyGeneratorOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)");
;
;
function applyGeneratorOptions({ type, ...options }) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGenerator"])(type) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$linear$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsLinearEasing"])()) {
        return type.applyToOptions(options);
    } else {
        options.duration ?? (options.duration = 300);
        options.ease ?? (options.ease = "easeOut");
    }
    return options;
}
;
 //# sourceMappingURL=apply-generator.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimation",
    ()=>NativeAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/style-set.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * NativeAnimation implements AnimationPlaybackControls for the browser's Web Animations API.
 */ class NativeAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor(options){
        super();
        this.finishedTime = null;
        this.isStopped = false;
        /**
         * Tracks a manually-set start time that takes precedence over WAAPI's
         * dynamic startTime. This is cleared when play() or time setter is called,
         * allowing WAAPI to take over timing.
         */ this.manualStartTime = null;
        if (!options) return;
        const { element, name, keyframes, pseudoElement, allowFlatten = false, finalKeyframe, onComplete } = options;
        this.isPseudoElement = Boolean(pseudoElement);
        this.allowFlatten = allowFlatten;
        this.options = options;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(typeof options.type !== "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$apply$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyGeneratorOptions"])(options);
        this.animation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$start$2d$waapi$2d$animation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startWaapiAnimation"])(element, name, keyframes, transition, pseudoElement);
        if (transition.autoplay === false) {
            this.animation.pause();
        }
        this.animation.onfinish = ()=>{
            this.finishedTime = this.time;
            if (!pseudoElement) {
                const keyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, this.options, finalKeyframe, this.speed);
                if (this.updateMotionValue) {
                    this.updateMotionValue(keyframe);
                } else {
                    /**
                     * If we can, we want to commit the final style as set by the user,
                     * rather than the computed keyframe value supplied by the animation.
                     */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$style$2d$set$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setStyle"])(element, name, keyframe);
                }
                this.animation.cancel();
            }
            onComplete?.();
            this.notifyFinished();
        };
    }
    play() {
        if (this.isStopped) return;
        this.manualStartTime = null;
        this.animation.play();
        if (this.state === "finished") {
            this.updateFinished();
        }
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.finish?.();
    }
    cancel() {
        try {
            this.animation.cancel();
        } catch (e) {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = true;
        const { state } = this;
        if (state === "idle" || state === "finished") {
            return;
        }
        if (this.updateMotionValue) {
            this.updateMotionValue();
        } else {
            this.commitStyles();
        }
        if (!this.isPseudoElement) this.cancel();
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * In this method, we commit styles back to the DOM before cancelling
     * the animation.
     *
     * This is designed to be overridden by NativeAnimationExtended, which
     * will create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to also correctly calculate velocity for any subsequent animation
     * while deferring the commit until the next animation frame.
     */ commitStyles() {
        if (!this.isPseudoElement) {
            this.animation.commitStyles?.();
        }
    }
    get duration() {
        const duration = this.animation.effect?.getComputedTiming?.().duration || 0;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(duration));
    }
    get iterationDuration() {
        const { delay = 0 } = this.options || {};
        return this.duration + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(delay);
    }
    get time() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["millisecondsToSeconds"])(Number(this.animation.currentTime) || 0);
    }
    set time(newTime) {
        this.manualStartTime = null;
        this.finishedTime = null;
        this.animation.currentTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(newTime);
    }
    /**
     * The playback speed of the animation.
     * 1 = normal speed, 2 = double speed, 0.5 = half speed.
     */ get speed() {
        return this.animation.playbackRate;
    }
    set speed(newSpeed) {
        // Allow backwards playback after finishing
        if (newSpeed < 0) this.finishedTime = null;
        this.animation.playbackRate = newSpeed;
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState;
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime);
    }
    set startTime(newStartTime) {
        this.manualStartTime = this.animation.startTime = newStartTime;
    }
    /**
     * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
     */ attachTimeline({ timeline, observe }) {
        if (this.allowFlatten) {
            this.animation.effect?.updateTiming({
                easing: "linear"
            });
        }
        this.animation.onfinish = null;
        if (timeline && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$supports$2f$scroll$2d$timeline$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsScrollTimeline"])()) {
            this.animation.timeline = timeline;
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"];
        } else {
            return observe(this);
        }
    }
}
;
 //# sourceMappingURL=NativeAnimation.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "replaceStringEasing",
    ()=>replaceStringEasing
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/anticipate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/back.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/easing/circ.mjs [app-client] (ecmascript)");
;
const unsupportedEasingFunctions = {
    anticipate: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$anticipate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anticipate"],
    backInOut: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$back$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["backInOut"],
    circInOut: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$easing$2f$circ$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["circInOut"]
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
function replaceStringEasing(transition) {
    if (typeof transition.ease === "string" && isUnsupportedEase(transition.ease)) {
        transition.ease = unsupportedEasingFunctions[transition.ease];
    }
}
;
 //# sourceMappingURL=unsupported-easing.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NativeAnimationExtended",
    ()=>NativeAnimationExtended
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/clamp.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$unsupported$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/utils/unsupported-easing.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */ const sampleDelta = 10; //ms
class NativeAnimationExtended extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimation"] {
    constructor(options){
        /**
         * The base NativeAnimation function only supports a subset
         * of Motion easings, and WAAPI also only supports some
         * easing functions via string/cubic-bezier definitions.
         *
         * This function replaces those unsupported easing functions
         * with a JS easing function. This will later get compiled
         * to a linear() easing function.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$utils$2f$unsupported$2d$easing$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceStringEasing"])(options);
        /**
         * Ensure we replace the transition type with a generator function
         * before passing to WAAPI.
         *
         * TODO: Does this have a better home? It could be shared with
         * JSAnimation.
         */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$replace$2d$transition$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceTransitionType"])(options);
        super(options);
        if (options.startTime !== undefined) {
            this.startTime = options.startTime;
        }
        this.options = options;
    }
    /**
     * WAAPI doesn't natively have any interruption capabilities.
     *
     * Rather than read committed styles back out of the DOM, we can
     * create a renderless JS animation and sample it twice to calculate
     * its current value, "previous" value, and therefore allow
     * Motion to calculate velocity for any subsequent animation.
     */ updateMotionValue(value) {
        const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
        if (!motionValue) return;
        if (value !== undefined) {
            motionValue.set(value);
            return;
        }
        const sampleAnimation = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSAnimation"]({
            ...options,
            autoplay: false
        });
        /**
         * Use wall-clock elapsed time for sampling.
         * Under CPU load, WAAPI's currentTime may not reflect actual
         * elapsed time, causing incorrect sampling and visual jumps.
         */ const sampleTime = Math.max(sampleDelta, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now() - this.startTime);
        const delta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$clamp$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(0, sampleDelta, sampleTime - sampleDelta);
        motionValue.setWithVelocity(sampleAnimation.sample(Math.max(0, sampleTime - delta)).value, sampleAnimation.sample(sampleTime).value, delta);
        sampleAnimation.stop();
    }
}
;
 //# sourceMappingURL=NativeAnimationExtended.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAnimatable",
    ()=>isAnimatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
;
/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */ const isAnimatable = (value, name)=>{
    // If the list of keys that might be non-animatable grows, replace with Set
    if (name === "zIndex") return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value)) return true;
    if (typeof value === "string" && // It's animatable if we have a string
    (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].test(value) || value === "0") && // And it contains numbers and/or colors
    !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};
;
 //# sourceMappingURL=is-animatable.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canAnimate",
    ()=>canAnimate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-animatable.mjs [app-client] (ecmascript)");
;
;
;
function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1) return true;
    for(let i = 0; i < keyframes.length; i++){
        if (keyframes[i] !== current) return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */ const originKeyframe = keyframes[0];
    if (originKeyframe === null) {
        return false;
    }
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */ if (name === "display" || name === "visibility") return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimatable"])(originKeyframe, name);
    const isTargetAnimatable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$animatable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimatable"])(targetKeyframe, name);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warning"])(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". "${isOriginAnimatable ? targetKeyframe : originKeyframe}" is not an animatable value.`, "value-not-animatable");
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        return false;
    }
    return hasKeyframesChanged(keyframes) || (type === "spring" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$generators$2f$utils$2f$is$2d$generator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGenerator"])(type)) && velocity;
}
;
 //# sourceMappingURL=can-animate.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeAnimationInstant",
    ()=>makeAnimationInstant
]);
function makeAnimationInstant(options) {
    options.duration = 0;
    options.type = "keyframes";
}
;
 //# sourceMappingURL=make-animation-instant.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supportsBrowserAnimation",
    ()=>supportsBrowserAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/memo.mjs [app-client] (ecmascript)");
;
/**
 * A list of values that can be hardware-accelerated.
 */ const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform"
]);
const supportsWaapi = /*@__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$memo$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(()=>Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(options) {
    const { motionValue, name, repeatDelay, repeatType, damping, type } = options;
    const subject = motionValue?.owner?.current;
    /**
     * We use this check instead of isHTMLElement() because we explicitly
     * **don't** want elements in different timing contexts (i.e. popups)
     * to be accelerated, as it's not possible to sync these animations
     * properly with those driven from the main window frameloop.
     */ if (!(subject instanceof HTMLElement)) {
        return false;
    }
    const { onUpdate, transformTemplate } = motionValue.owner.getProps();
    return supportsWaapi() && name && acceleratedValues.has(name) && (name !== "transform" || !transformTemplate) && /**
         * If we're outputting values to onUpdate then we can't use WAAPI as there's
         * no way to read the value from WAAPI every frame.
         */ !onUpdate && !repeatDelay && repeatType !== "mirror" && damping !== 0 && type !== "inertia";
}
;
 //# sourceMappingURL=waapi.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AsyncMotionValueAnimation",
    ()=>AsyncMotionValueAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/noop.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimationExtended$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$can$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$supports$2f$waapi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */ const MAX_RESOLVE_DELAY = 40;
class AsyncMotionValueAnimation extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$WithPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WithPromise"] {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", keyframes, name, motionValue, element, ...options }){
        super();
        /**
         * Bound to support return animation.stop pattern
         */ this.stop = ()=>{
            if (this._animation) {
                this._animation.stop();
                this.stopTimeline?.();
            }
            this.keyframeResolver?.cancel();
        };
        this.createdAt = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        const optionsWithDefaults = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            name,
            motionValue,
            element,
            ...options
        };
        const KeyframeResolver$1 = element?.KeyframeResolver || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeResolver"];
        this.keyframeResolver = new KeyframeResolver$1(keyframes, (resolvedKeyframes, finalKeyframe, forced)=>this.onKeyframesResolved(resolvedKeyframes, finalKeyframe, optionsWithDefaults, !forced), name, motionValue, element);
        this.keyframeResolver?.scheduleResolve();
    }
    onKeyframesResolved(keyframes, finalKeyframe, options, sync) {
        this.keyframeResolver = undefined;
        const { name, type, velocity, delay, isHandoff, onUpdate } = options;
        this.resolvedAt = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$can$2d$animate$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["canAnimate"])(keyframes, name, type, velocity)) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].instantAnimations || !delay) {
                onUpdate?.((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$get$2d$final$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(keyframes, options, finalKeyframe));
            }
            keyframes[0] = keyframes[keyframes.length - 1];
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAnimationInstant"])(options);
            options.repeat = 0;
        }
        /**
         * Resolve startTime for the animation.
         *
         * This method uses the createdAt and resolvedAt to calculate the
         * animation startTime. *Ideally*, we would use the createdAt time as t=0
         * as the following frame would then be the first frame of the animation in
         * progress, which would feel snappier.
         *
         * However, if there's a delay (main thread work) between the creation of
         * the animation and the first committed frame, we prefer to use resolvedAt
         * to avoid a sudden jump into the animation.
         */ const startTime = sync ? !this.resolvedAt ? this.createdAt : this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : undefined;
        const resolvedOptions = {
            startTime,
            finalKeyframe,
            ...options,
            keyframes
        };
        /**
         * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
         * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
         * optimised animation.
         */ const useWaapi = !isHandoff && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$waapi$2f$supports$2f$waapi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supportsBrowserAnimation"])(resolvedOptions);
        const element = resolvedOptions.motionValue?.owner?.current;
        const animation = useWaapi ? new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$NativeAnimationExtended$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NativeAnimationExtended"]({
            ...resolvedOptions,
            element
        }) : new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSAnimation"](resolvedOptions);
        animation.finished.then(()=>{
            this.notifyFinished();
        }).catch(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$noop$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noop"]);
        if (this.pendingTimeline) {
            this.stopTimeline = animation.attachTimeline(this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        this._animation = animation;
    }
    get finished() {
        if (!this._animation) {
            return this._finished;
        } else {
            return this.animation.finished;
        }
    }
    then(onResolve, _onReject) {
        return this.finished.finally(onResolve).then(()=>{});
    }
    get animation() {
        if (!this._animation) {
            this.keyframeResolver?.resume();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushKeyframeResolvers"])();
        }
        return this._animation;
    }
    get duration() {
        return this.animation.duration;
    }
    get iterationDuration() {
        return this.animation.iterationDuration;
    }
    get time() {
        return this.animation.time;
    }
    set time(newTime) {
        this.animation.time = newTime;
    }
    get speed() {
        return this.animation.speed;
    }
    get state() {
        return this.animation.state;
    }
    set speed(newSpeed) {
        this.animation.speed = newSpeed;
    }
    get startTime() {
        return this.animation.startTime;
    }
    attachTimeline(timeline) {
        if (this._animation) {
            this.stopTimeline = this.animation.attachTimeline(timeline);
        } else {
            this.pendingTimeline = timeline;
        }
        return ()=>this.stop();
    }
    play() {
        this.animation.play();
    }
    pause() {
        this.animation.pause();
    }
    complete() {
        this.animation.complete();
    }
    cancel() {
        if (this._animation) {
            this.animation.cancel();
        }
        this.keyframeResolver?.cancel();
    }
}
;
 //# sourceMappingURL=AsyncMotionValueAnimation.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getValueTransition",
    ()=>getValueTransition
]);
function getValueTransition(transition, key) {
    return transition?.[key] ?? transition?.["default"] ?? transition;
}
;
 //# sourceMappingURL=get-value-transition.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultTransition",
    ()=>getDefaultTransition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
;
const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10
};
const criticallyDampedSpring = (target)=>({
        type: "spring",
        stiffness: 550,
        damping: target === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    });
const keyframesTransition = {
    type: "keyframes",
    duration: 0.8
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */ const ease = {
    type: "keyframes",
    ease: [
        0.25,
        0.1,
        0.35,
        1
    ],
    duration: 0.3
};
const getDefaultTransition = (valueKey, { keyframes })=>{
    if (keyframes.length > 2) {
        return keyframesTransition;
    } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(valueKey)) {
        return valueKey.startsWith("scale") ? criticallyDampedSpring(keyframes[1]) : underDampedSpring;
    }
    return ease;
};
;
 //# sourceMappingURL=default-transitions.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/get-final-keyframe.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFinalKeyframe",
    ()=>getFinalKeyframe
]);
const isNotNull = (value)=>value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const index = repeat && repeatType !== "loop" && repeat % 2 === 1 ? 0 : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined ? resolvedKeyframes[index] : finalKeyframe;
}
;
 //# sourceMappingURL=get-final-keyframe.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */ __turbopack_context__.s([
    "isTransitionDefined",
    ()=>isTransitionDefined
]);
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
    return !!Object.keys(transition).length;
}
;
 //# sourceMappingURL=is-transition-defined.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "animateMotionValue",
    ()=>animateMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/time-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$AsyncMotionValueAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/JSAnimation.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$default$2d$transitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$final$2d$keyframe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/get-final-keyframe.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$transition$2d$defined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-transition-defined.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
const animateMotionValue = (name, value, target, transition = {}, element, isHandoff)=>(onComplete)=>{
        const valueTransition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueTransition"])(transition, name) || {};
        /**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */ const delay = valueTransition.delay || transition.delay || 0;
        /**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */ let { elapsed = 0 } = transition;
        elapsed = elapsed - (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(delay);
        const options = {
            keyframes: Array.isArray(target) ? target : [
                null,
                target
            ],
            ease: "easeOut",
            velocity: value.getVelocity(),
            ...valueTransition,
            delay: -elapsed,
            onUpdate: (v)=>{
                value.set(v);
                valueTransition.onUpdate && valueTransition.onUpdate(v);
            },
            onComplete: ()=>{
                onComplete();
                valueTransition.onComplete && valueTransition.onComplete();
            },
            name,
            motionValue: value,
            element: isHandoff ? undefined : element
        };
        /**
     * If there's no transition defined for this value, we can generate
     * unique transition settings for this value.
     */ if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$transition$2d$defined$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTransitionDefined"])(valueTransition)) {
            Object.assign(options, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$default$2d$transitions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultTransition"])(name, options));
        }
        /**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */ options.duration && (options.duration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(options.duration));
        options.repeatDelay && (options.repeatDelay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$time$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondsToMilliseconds"])(options.repeatDelay));
        /**
     * Support deprecated way to set initial value. Prefer keyframe syntax.
     */ if (options.from !== undefined) {
            options.keyframes[0] = options.from;
        }
        let shouldSkip = false;
        if (options.type === false || options.duration === 0 && !options.repeatDelay) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAnimationInstant"])(options);
            if (options.delay === 0) {
                shouldSkip = true;
            }
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].instantAnimations || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].skipAnimations) {
            shouldSkip = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$make$2d$animation$2d$instant$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeAnimationInstant"])(options);
            options.delay = 0;
        }
        /**
     * If the transition type or easing has been explicitly set by the user
     * then we don't want to allow flattening the animation.
     */ options.allowFlatten = !valueTransition.type && !valueTransition.ease;
        /**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */ if (shouldSkip && !isHandoff && value.get() !== undefined) {
            const finalKeyframe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$final$2d$keyframe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFinalKeyframe"])(options.keyframes, valueTransition);
            if (finalKeyframe !== undefined) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].update(()=>{
                    options.onUpdate(finalKeyframe);
                    options.onComplete();
                });
                return;
            }
        }
        return valueTransition.isSync ? new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$JSAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JSAnimation"](options) : new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$AsyncMotionValueAnimation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AsyncMotionValueAnimation"](options);
    };
;
 //# sourceMappingURL=motion-value.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MotionValue",
    ()=>MotionValue,
    "collectMotionValues",
    ()=>collectMotionValues,
    "motionValue",
    ()=>motionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/velocity-per-second.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */ const MAX_VELOCITY_DELTA = 30;
const isFloat = (value)=>{
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */ class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     */ constructor(init, options = {}){
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */ this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        this.updateAndNotify = (v)=>{
            const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */ if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev) {
                this.events.change?.notify(this.current);
                if (this.dependents) {
                    for (const dependent of this.dependents){
                        dependent.dirty();
                    }
                }
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */ onChange(subscription) {
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return ()=>{
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].read(()=>{
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for(const eventManagers in this.events){
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     */ attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */ set(v) {
        if (!this.passiveEffect) {
            this.updateAndNotify(v);
        } else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */ jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect) this.stopPassiveEffect();
    }
    dirty() {
        this.events.change?.notify(this.current);
    }
    addDependent(dependent) {
        if (!this.dependents) {
            this.dependents = new Set();
        }
        this.dependents.add(dependent);
    }
    removeDependent(dependent) {
        if (this.dependents) {
            this.dependents.delete(dependent);
        }
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */ get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */ getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */ getVelocity() {
        const currentTime = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
        if (!this.canTrackVelocity || this.prevFrameValue === undefined || currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$velocity$2d$per$2d$second$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["velocityPerSecond"])(parseFloat(this.current) - parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     */ start(startAnimation) {
        this.stop();
        return new Promise((resolve)=>{
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(()=>{
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */ stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */ isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */ destroy() {
        this.dependents?.clear();
        this.events.destroy?.notify();
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/animate/single-value.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "animateSingleValue",
    ()=>animateSingleValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
;
;
function animateSingleValue(value, keyframes, options) {
    const motionValue$1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(value);
    motionValue$1.start((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateMotionValue"])("", motionValue$1, keyframes, options));
    return motionValue$1.animation;
}
;
 //# sourceMappingURL=single-value.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visualElementStore",
    ()=>visualElementStore
]);
const visualElementStore = new WeakMap();
;
 //# sourceMappingURL=store.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "positionalKeys",
    ()=>positionalKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
;
const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"]
]);
;
 //# sourceMappingURL=keys-position.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveVariantFromProps",
    ()=>resolveVariantFromProps
]);
function getValueState(visualElement) {
    const state = [
        {},
        {}
    ];
    visualElement?.values.forEach((value, key)=>{
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */ if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */ if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}
;
 //# sourceMappingURL=resolve-variants.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveVariant",
    ()=>resolveVariant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
;
function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}
;
 //# sourceMappingURL=resolve-dynamic-variants.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isKeyframesTarget",
    ()=>isKeyframesTarget
]);
const isKeyframesTarget = (v)=>{
    return Array.isArray(v);
};
;
 //# sourceMappingURL=is-keyframes-target.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/setters.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setTarget",
    ()=>setTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs [app-client] (ecmascript)");
;
;
;
/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */ function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    } else {
        visualElement.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(value));
    }
}
function resolveFinalValueInKeyframes(v) {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$keyframes$2d$target$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isKeyframesTarget"])(v) ? v[v.length - 1] || 0 : v;
}
function setTarget(visualElement, definition) {
    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$dynamic$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariant"])(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = {
        ...target,
        ...transitionEnd
    };
    for(const key in target){
        const value = resolveFinalValueInKeyframes(target[key]);
        setMotionValue(visualElement, key, value);
    }
}
;
 //# sourceMappingURL=setters.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/will-change/is.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isWillChangeMotionValue",
    ()=>isWillChangeMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
function isWillChangeMotionValue(value) {
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) && value.add);
}
;
 //# sourceMappingURL=is.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addValueToWillChange",
    ()=>addValueToWillChange
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/global-config.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$will$2d$change$2f$is$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/will-change/is.mjs [app-client] (ecmascript)");
;
;
function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */ if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$will$2d$change$2f$is$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isWillChangeMotionValue"])(willChange)) {
        return willChange.add(key);
    } else if (!willChange && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].WillChange) {
        const newWillChange = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$global$2d$config$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MotionGlobalConfig"].WillChange("auto");
        visualElement.addValue("willChange", newWillChange);
        newWillChange.add(key);
    }
}
;
 //# sourceMappingURL=add-will-change.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "camelToDash",
    ()=>camelToDash
]);
function camelToDash(str) {
    return str.replace(/([A-Z])/g, (match)=>`-${match.toLowerCase()}`);
}
;
 //# sourceMappingURL=camel-to-dash.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "optimizedAppearDataAttribute",
    ()=>optimizedAppearDataAttribute,
    "optimizedAppearDataId",
    ()=>optimizedAppearDataId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)");
;
const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelToDash"])(optimizedAppearDataId);
;
 //# sourceMappingURL=data-id.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOptimisedAppearId",
    ()=>getOptimisedAppearId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/optimized-appear/data-id.mjs [app-client] (ecmascript)");
;
function getOptimisedAppearId(visualElement) {
    return visualElement.props[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$data$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["optimizedAppearDataAttribute"]];
}
;
 //# sourceMappingURL=get-appear-id.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "animateTarget",
    ()=>animateTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$setters$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/setters.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$will$2d$change$2f$add$2d$will$2d$change$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$get$2d$appear$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */ function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
    const reduceMotion = transition?.reduceMotion;
    if (transitionOverride) transition = transitionOverride;
    const animations = [];
    const animationTypeState = type && visualElement.animationState && visualElement.animationState.getState()[type];
    for(const key in target){
        const value = visualElement.getValue(key, visualElement.latestValues[key] ?? null);
        const valueTarget = target[key];
        if (valueTarget === undefined || animationTypeState && shouldBlockAnimation(animationTypeState, key)) {
            continue;
        }
        const valueTransition = {
            delay,
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$get$2d$value$2d$transition$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueTransition"])(transition || {}, key)
        };
        /**
         * If the value is already at the defined target, skip the animation.
         */ const currentValue = value.get();
        if (currentValue !== undefined && !value.isAnimating && !Array.isArray(valueTarget) && valueTarget === currentValue && !valueTransition.velocity) {
            continue;
        }
        /**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */ let isHandoff = false;
        if (window.MotionHandoffAnimation) {
            const appearId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$optimized$2d$appear$2f$get$2d$appear$2d$id$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getOptimisedAppearId"])(visualElement);
            if (appearId) {
                const startTime = window.MotionHandoffAnimation(appearId, key, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"]);
                if (startTime !== null) {
                    valueTransition.startTime = startTime;
                    isHandoff = true;
                }
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$will$2d$change$2f$add$2d$will$2d$change$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addValueToWillChange"])(visualElement, key);
        const shouldReduceMotion = reduceMotion ?? visualElement.shouldReduceMotion;
        value.start((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$interfaces$2f$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animateMotionValue"])(key, value, valueTarget, shouldReduceMotion && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalKeys"].has(key) ? {
            type: false
        } : valueTransition, visualElement, isHandoff));
        const animation = value.animation;
        if (animation) {
            animations.push(animation);
        }
    }
    if (transitionEnd) {
        Promise.all(animations).then(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].update(()=>{
                transitionEnd && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$setters$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setTarget"])(visualElement, transitionEnd);
            });
        });
    }
    return animations;
}
;
 //# sourceMappingURL=visual-element-target.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGElement",
    ()=>isSVGElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/is-object.mjs [app-client] (ecmascript)");
;
/**
 * Checks if an element is an SVG element in a way
 * that works across iframes
 */ function isSVGElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$object$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isObject"])(element) && "ownerSVGElement" in element;
}
;
 //# sourceMappingURL=is-svg-element.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGSVGElement",
    ()=>isSVGSVGElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/is-svg-element.mjs [app-client] (ecmascript)");
;
/**
 * Checks if an element is specifically an SVGSVGElement (the root SVG element)
 * in a way that works across iframes
 */ function isSVGSVGElement(element) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$is$2d$svg$2d$element$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGElement"])(element) && element.tagName === "svg";
}
;
 //# sourceMappingURL=is-svg-svg-element.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filter",
    ()=>filter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/float-regex.mjs [app-client] (ecmascript)");
;
;
/**
 * Properties that should default to 1 or 100%
 */ const maxDefaults = new Set([
    "brightness",
    "contrast",
    "saturate",
    "opacity"
]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow") return v;
    const [number] = value.match(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$float$2d$regex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["floatRegex"]) || [];
    if (!number) return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value) defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"],
    getAnimatableNone: (v)=>{
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    }
};
;
 //# sourceMappingURL=filter.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/int.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "int",
    ()=>int
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
;
const int = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    transform: Math.round
};
;
 //# sourceMappingURL=int.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformValueTypes",
    ()=>transformValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
;
const transformValueTypes = {
    rotate: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    rotateZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    scale: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    scaleZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scale"],
    skew: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    skewX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    skewY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    distance: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    translateZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    x: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    y: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    z: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    perspective: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    transformPerspective: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    opacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    originX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progressPercentage"],
    originY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["progressPercentage"],
    originZ: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"]
};
;
 //# sourceMappingURL=transform.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "numberValueTypes",
    ()=>numberValueTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/int.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/transform.mjs [app-client] (ecmascript)");
;
;
;
;
const numberValueTypes = {
    // Border props
    borderWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderRightWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderLeftWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Positioning props
    width: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    maxWidth: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    height: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    maxHeight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    top: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    right: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    bottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    left: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    inset: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    insetInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Spacing props
    padding: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingTop: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingRight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingLeft: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    paddingInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    margin: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginTop: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginRight: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginLeft: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlock: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlockStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginBlockEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInline: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInlineStart: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    marginInlineEnd: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Typography
    fontSize: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    // Misc
    backgroundPositionX: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    backgroundPositionY: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformValueTypes"],
    zIndex: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["int"],
    // SVG
    fillOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    strokeOpacity: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["alpha"],
    numOctaves: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$int$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["int"]
};
;
 //# sourceMappingURL=number.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultValueTypes",
    ()=>defaultValueTypes,
    "getDefaultValueType",
    ()=>getDefaultValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
;
;
;
/**
 * A map of default value types for common values
 */ const defaultValueTypes = {
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"],
    // Color props
    color: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    outlineColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    fill: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    stroke: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    // Border props
    borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderTopColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderRightColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderBottomColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    borderLeftColor: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    filter: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"],
    WebkitFilter: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"]
};
/**
 * Gets the default ValueType for the provided value key
 */ const getDefaultValueType = (key)=>defaultValueTypes[key];
;
 //# sourceMappingURL=defaults.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAxis",
    ()=>createAxis,
    "createAxisDelta",
    ()=>createAxisDelta,
    "createBox",
    ()=>createBox,
    "createDelta",
    ()=>createDelta
]);
const createAxisDelta = ()=>({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    });
const createDelta = ()=>({
        x: createAxisDelta(),
        y: createAxisDelta()
    });
const createAxis = ()=>({
        min: 0,
        max: 0
    });
const createBox = ()=>({
        x: createAxis(),
        y: createAxis()
    });
;
 //# sourceMappingURL=models.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ValueType for "auto"
 */ __turbopack_context__.s([
    "auto",
    ()=>auto
]);
const auto = {
    test: (v)=>v === "auto",
    parse: (v)=>v
};
;
 //# sourceMappingURL=auto.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Tests a provided value against a ValueType
 */ __turbopack_context__.s([
    "testValueType",
    ()=>testValueType
]);
const testValueType = (v)=>(type)=>type.test(v);
;
 //# sourceMappingURL=test.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dimensionValueTypes",
    ()=>dimensionValueTypes,
    "findDimensionValueType",
    ()=>findDimensionValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/auto.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)");
;
;
;
;
/**
 * A list of value types commonly used for dimensions
 */ const dimensionValueTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["percent"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["degrees"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vw"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vh"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$auto$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auto"]
];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */ const findDimensionValueType = (v)=>dimensionValueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
 //# sourceMappingURL=dimensions.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVariableValue",
    ()=>getVariableValue,
    "parseCSSVariable",
    ()=>parseCSSVariable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
;
;
/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */ const splitCSSVariableRegex = // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match) return [
        , 
    ];
    const [, token1, token2, fallback] = match;
    return [
        `--${token1 ?? token2}`,
        fallback
    ];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["invariant"])(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token) return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumericalString"])(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(fallback) ? getVariableValue(fallback, element, depth + 1) : fallback;
}
;
 //# sourceMappingURL=css-variables-conversion.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNone",
    ()=>isNone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)");
;
function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    } else if (value !== null) {
        return value === "none" || value === "0" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZeroValueString"])(value);
    } else {
        return true;
    }
}
;
 //# sourceMappingURL=is-none.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAnimatableNone",
    ()=>getAnimatableNone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/filter.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)");
;
;
;
function getAnimatableNone(key, value) {
    let defaultValueType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultValueType"])(key);
    if (defaultValueType !== __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$filter$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"]) defaultValueType = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"];
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone ? defaultValueType.getAnimatableNone(value) : undefined;
}
;
 //# sourceMappingURL=animatable-none.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeNoneKeyframesAnimatable",
    ()=>makeNoneKeyframesAnimatable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)");
;
;
/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */ const invalidTemplates = new Set([
    "auto",
    "none",
    "0"
]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while(i < unresolvedKeyframes.length && !animatableTemplate){
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" && !invalidTemplates.has(keyframe) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyseComplexValue"])(keyframe).values.length) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes){
            unresolvedKeyframes[noneIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnimatableNone"])(name, animatableTemplate);
        }
    }
}
;
 //# sourceMappingURL=make-none-animatable.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOMKeyframesResolver",
    ()=>DOMKeyframesResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-position.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$css$2d$variables$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/css-variables-conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$is$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$make$2d$none$2d$animatable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
class DOMKeyframesResolver extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeResolver"] {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element){
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current) return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */ for(let i = 0; i < unresolvedKeyframes.length; i++){
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableToken"])(keyframe)) {
                    const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$css$2d$variables$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVariableValue"])(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */ this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */ if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$position$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalKeys"].has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        const originType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findDimensionValueType"])(origin);
        const targetType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findDimensionValueType"])(target);
        /**
         * If one keyframe contains embedded CSS variables (e.g. in calc()) and the other
         * doesn't, we need to measure to convert to pixels. This handles GitHub issue #3410.
         */ const originHasVar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containsCSSVariable"])(origin);
        const targetHasVar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["containsCSSVariable"])(target);
        if (originHasVar !== targetHasVar && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalValues"][name]) {
            this.needsMeasurement = true;
            return;
        }
        /**
         * Either we don't recognise these value types or we can animate between them.
         */ if (originType === targetType) return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */ if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumOrPxType"])(originType) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumOrPxType"])(targetType)) {
            for(let i = 0; i < unresolvedKeyframes.length; i++){
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        } else if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalValues"][name]) {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */ this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for(let i = 0; i < unresolvedKeyframes.length; i++){
            if (unresolvedKeyframes[i] === null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$is$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNone"])(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$make$2d$none$2d$animatable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeNoneKeyframesAnimatable"])(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current) return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalValues"][name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        const { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current) return;
        const value = element.getValue(name);
        value && value.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$utils$2f$unit$2d$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["positionalValues"][name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if (this.removedTransforms?.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue])=>{
                element.getValue(unsetTransformName).set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}
;
 //# sourceMappingURL=DOMKeyframesResolver.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancelMicrotask",
    ()=>cancelMicrotask,
    "microtask",
    ()=>microtask
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/batcher.mjs [app-client] (ecmascript)");
;
const { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$batcher$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRenderBatcher"])(queueMicrotask, false);
;
 //# sourceMappingURL=microtask.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findValueType",
    ()=>findValueType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/color/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/dimensions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/test.mjs [app-client] (ecmascript)");
;
;
;
;
/**
 * A list of all ValueTypes
 */ const valueTypes = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$dimensions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dimensionValueTypes"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$color$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["color"],
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"]
];
/**
 * Tests a value against the list of ValueTypes
 */ const findValueType = (v)=>valueTypes.find((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$test$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["testValueType"])(v));
;
 //# sourceMappingURL=find.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Does this device prefer reduced motion? Returns `null` server-side.
__turbopack_context__.s([
    "hasReducedMotionListener",
    ()=>hasReducedMotionListener,
    "prefersReducedMotion",
    ()=>prefersReducedMotion
]);
const prefersReducedMotion = {
    current: null
};
const hasReducedMotionListener = {
    current: false
};
;
 //# sourceMappingURL=state.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initPrefersReducedMotion",
    ()=>initPrefersReducedMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)");
;
const isBrowser = typeof window !== "undefined";
function initPrefersReducedMotion() {
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current = true;
    if (!isBrowser) return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = motionMediaQuery.matches;
        motionMediaQuery.addEventListener("change", setReducedMotionPreferences);
        setReducedMotionPreferences();
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current = false;
    }
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAnimationControls",
    ()=>isAnimationControls
]);
function isAnimationControls(v) {
    return v !== null && typeof v === "object" && typeof v.start === "function";
}
;
 //# sourceMappingURL=is-animation-controls.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Decides if the supplied variable is variant label
 */ __turbopack_context__.s([
    "isVariantLabel",
    ()=>isVariantLabel
]);
function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}
;
 //# sourceMappingURL=is-variant-label.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/variant-props.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "variantPriorityOrder",
    ()=>variantPriorityOrder,
    "variantProps",
    ()=>variantProps
]);
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit"
];
const variantProps = [
    "initial",
    ...variantPriorityOrder
];
;
 //# sourceMappingURL=variant-props.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isControllingVariants",
    ()=>isControllingVariants,
    "isVariantNode",
    ()=>isVariantNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/variant-props.mjs [app-client] (ecmascript)");
;
;
;
function isControllingVariants(props) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$animation$2d$controls$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isAnimationControls"])(props.animate) || __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$variant$2d$props$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["variantProps"].some((name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$variant$2d$label$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantLabel"])(props[name]));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}
;
 //# sourceMappingURL=is-controlling-variants.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateMotionValuesFromProps",
    ()=>updateMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
;
;
/**
 * Updates motion values from props changes.
 * Uses `any` type for element to avoid circular dependencies with VisualElement.
 */ function updateMotionValuesFromProps(element, next, prev) {
    for(const key in next){
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */ element.addValue(key, nextValue);
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */ element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(nextValue, {
                owner: element
            }));
        } else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */ if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                } else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            } else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(latestValue !== undefined ? latestValue : nextValue, {
                    owner: element
                }));
            }
        }
    }
    // Handle removed values
    for(const key in prev){
        if (next[key] === undefined) element.removeValue(key);
    }
    return next;
}
;
 //# sourceMappingURL=motion-values.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VisualElement",
    ()=>VisualElement,
    "getFeatureDefinitions",
    ()=>getFeatureDefinitions,
    "setFeatureDefinitions",
    ()=>setFeatureDefinitions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/warn-once.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/is-numerical-string.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/is-zero-value-string.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-utils/dist/es/subscription-manager.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/microtask.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/sync-time.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/find.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/animatable-none.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/reduced-motion/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/store.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/motion-values.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/frameloop/frame.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete"
];
/**
 * Static feature definitions - can be injected by framework layer
 */ let featureDefinitions = {};
/**
 * Set feature definitions for all VisualElements.
 * This should be called by the framework layer (e.g., framer-motion) during initialization.
 */ function setFeatureDefinitions(definitions) {
    featureDefinitions = definitions;
}
/**
 * Get the current feature definitions
 */ function getFeatureDefinitions() {
    return featureDefinitions;
}
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */ class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */ scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState }, options = {}){
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */ this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */ this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */ this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */ this.shouldReduceMotion = null;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */ this.values = new Map();
        this.KeyframeResolver = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$KeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyframeResolver"];
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */ this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */ this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */ this.prevMotionValues = {};
        /**
         * An object containing a SubscriptionManager for each active event.
         */ this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */ this.propEventSubscriptions = {};
        this.notifyUpdate = ()=>this.notify("Update", this.latestValues);
        this.render = ()=>{
            if (!this.current) return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = ()=>{
            const now = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$sync$2d$time$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["time"].now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].render(this.render, false, true);
            }
        };
        const { latestValues, renderState } = visualState;
        this.latestValues = latestValues;
        this.baseTarget = {
            ...latestValues
        };
        this.initialValues = props.initial ? {
            ...latestValues
        } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isControllingVariants"])(props);
        this.isVariantNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$controlling$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isVariantNode"])(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */ const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for(const key in initialMotionValues){
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value)) {
                value.set(latestValues[key]);
            }
        }
    }
    mount(instance) {
        this.current = instance;
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visualElementStore"].set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key)=>this.bindToMotionValue(key, value));
        /**
         * Determine reduced motion preference. Only initialize the matchMedia
         * listener if we actually need the dynamic value (i.e., when config
         * is neither "never" nor "always").
         */ if (this.reducedMotionConfig === "never") {
            this.shouldReduceMotion = false;
        } else if (this.reducedMotionConfig === "always") {
            this.shouldReduceMotion = true;
        } else {
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasReducedMotionListener"].current) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initPrefersReducedMotion"])();
            }
            this.shouldReduceMotion = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$reduced$2d$motion$2f$state$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["prefersReducedMotion"].current;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$warn$2d$once$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["warnOnce"])(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled");
        }
        this.parent?.addChild(this);
        this.update(this.props, this.presenceContext);
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(this.notifyUpdate);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancelFrame"])(this.render);
        this.valueSubscriptions.forEach((remove)=>remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent?.removeChild(this);
        for(const key in this.events){
            this.events[key].clear();
        }
        for(const key in this.features){
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    addChild(child) {
        this.children.add(child);
        this.enteringChildren ?? (this.enteringChildren = new Set());
        this.enteringChildren.add(child);
    }
    removeChild(child) {
        this.children.delete(child);
        this.enteringChildren && this.enteringChildren.delete(child);
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        const valueIsTransform = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue)=>{
            this.latestValues[key] = latestValue;
            this.props.onUpdate && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$frame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frame"].preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
            this.scheduleRender();
        });
        let removeSyncCheck;
        if (typeof window !== "undefined" && window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, ()=>{
            removeOnChange();
            if (removeSyncCheck) removeSyncCheck();
            if (value.owner) value.stop();
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */ if (!this.current || !this.sortInstanceNodePosition || this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for(key in featureDefinitions){
            const featureDefinition = featureDefinitions[key];
            if (!featureDefinition) continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */ if (!this.features[key] && FeatureConstructor && isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */ if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                } else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */ measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBox"])();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */ update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */ for(let i = 0; i < propEventHandlers.length; i++){
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = "on" + key;
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateMotionValuesFromProps"])(this, this.scrapeMotionValuesFromProps(props, this.prevProps || {}, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */ getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */ getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */ addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren && closestVariantNode.variantChildren.add(child);
            return ()=>closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */ addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue) this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */ removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */ hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motionValue"])(defaultValue === null ? undefined : defaultValue, {
                owner: this
            });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */ readValue(key, target) {
        let value = this.latestValues[key] !== undefined || !this.current ? this.latestValues[key] : this.getBaseTargetFromProps(this.props, key) ?? this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$numerical$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNumericalString"])(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$is$2d$zero$2d$value$2d$string$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isZeroValueString"])(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$find$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findValueType"])(value) && __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].test(target)) {
                value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$animatable$2d$none$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAnimatableNone"])(key, target);
            }
            this.setBaseTarget(key, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */ setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */ getBaseTarget(key) {
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$resolve$2d$variants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveVariantFromProps"])(this.props, initial, this.presenceContext?.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */ if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */ const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(target)) return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */ return this.initialValues[key] !== undefined && valueFromInitial === undefined ? undefined : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$utils$2f$dist$2f$es$2f$subscription$2d$manager$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionManager"]();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
    scheduleRenderMicrotask() {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$frameloop$2f$microtask$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microtask"].render(this.render);
    }
}
;
 //# sourceMappingURL=VisualElement.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOMVisualElement",
    ()=>DOMVisualElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$DOMKeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)");
;
;
;
class DOMVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualElement"] {
    constructor(){
        super(...arguments);
        this.KeyframeResolver = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$keyframes$2f$DOMKeyframesResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMKeyframesResolver"];
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */ return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        const style = props.style;
        return style ? style[key] : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(children)) {
            this.childSubscription = children.on("change", (latest)=>{
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}
;
 //# sourceMappingURL=DOMVisualElement.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Provided a value and a ValueType, returns the value as that value type.
 */ __turbopack_context__.s([
    "getValueAsType",
    ()=>getValueAsType
]);
const getValueAsType = (value, type)=>{
    return type && typeof value === "number" ? type.transform(value) : value;
};
;
 //# sourceMappingURL=get-as-type.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildTransform",
    ()=>buildTransform
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
;
;
;
const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective"
};
const numTransforms = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */ function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */ for(let i = 0; i < numTransforms; i++){
        const key = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"][i];
        const value = latestValues[key];
        if (value === undefined) continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        } else {
            const parsed = parseFloat(value);
            valueIsDefault = key.startsWith("scale") ? parsed === 1 : parsed === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    } else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}
;
 //# sourceMappingURL=build-transform.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildHTMLStyles",
    ()=>buildHTMLStyles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs [app-client] (ecmascript)");
;
;
;
;
;
function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */ for(const key in latestValues){
        const value = latestValues[key];
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key)) {
            vars[key] = value;
            continue;
        } else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$utils$2f$get$2d$as$2d$type$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getValueAsType"])(value, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["numberValueTypes"][key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] = valueAsType;
            } else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTransform"])(latestValues, state.transform, transformTemplate);
        } else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */ style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */ if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0 } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}
;
 //# sourceMappingURL=build-styles.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/path.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSVGPath",
    ()=>buildSVGPath
]);
const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray"
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray"
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 *
 * Note: We use unitless values for stroke-dasharray and stroke-dashoffset
 * because Safari incorrectly scales px values when the page is zoomed.
 */ function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset (unitless to avoid Safari zoom bug)
    attrs[keys.offset] = `${-offset}`;
    // Build the dash array (unitless to avoid Safari zoom bug)
    attrs[keys.array] = `${length} ${spacing}`;
}
;
 //# sourceMappingURL=path.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSVGAttrs",
    ()=>buildSVGAttrs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/path.mjs [app-client] (ecmascript)");
;
;
/**
 * CSS Motion Path properties that should remain as CSS styles on SVG elements.
 */ const cssMotionPathProperties = [
    "offsetDistance",
    "offsetPath",
    "offsetRotate",
    "offsetAnchor"
];
/**
 * Build SVG visual attributes, like cx and style.transform
 */ function buildSVGAttrs(state, { attrX, attrY, attrScale, pathLength, pathSpacing = 1, pathOffset = 0, // This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate, styleProp) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */ if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style } = state;
    /**
     * However, we apply transforms as CSS transforms.
     * So if we detect a transform, transformOrigin we take it from attrs and copy it into style.
     */ if (attrs.transform) {
        style.transform = attrs.transform;
        delete attrs.transform;
    }
    if (style.transform || attrs.transformOrigin) {
        style.transformOrigin = attrs.transformOrigin ?? "50% 50%";
        delete attrs.transformOrigin;
    }
    if (style.transform) {
        /**
         * SVG's element transform-origin uses its own median as a reference.
         * Therefore, transformBox becomes a fill-box
         */ style.transformBox = styleProp?.transformBox ?? "fill-box";
        delete attrs.transformBox;
    }
    for (const key of cssMotionPathProperties){
        if (attrs[key] !== undefined) {
            style[key] = attrs[key];
            delete attrs[key];
        }
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined) attrs.x = attrX;
    if (attrY !== undefined) attrs.y = attrY;
    if (attrScale !== undefined) attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$path$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSVGPath"])(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}
;
 //# sourceMappingURL=build-attrs.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A set of attribute names that are always read/written as camel case.
 */ __turbopack_context__.s([
    "camelCaseAttributes",
    ()=>camelCaseAttributes
]);
const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust"
]);
;
 //# sourceMappingURL=camel-case-attrs.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSVGTag",
    ()=>isSVGTag
]);
const isSVGTag = (tag)=>typeof tag === "string" && tag.toLowerCase() === "svg";
;
 //# sourceMappingURL=is-svg-tag.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/render.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderHTML",
    ()=>renderHTML
]);
function renderHTML(element, { style, vars }, styleProp, projection) {
    const elementStyle = element.style;
    let key;
    for(key in style){
        // CSSStyleDeclaration has [index: number]: string; in the types, so we use that as key type.
        elementStyle[key] = style[key];
    }
    // Write projection styles directly to element style
    projection?.applyProjectionStyles(elementStyle, styleProp);
    for(key in vars){
        // Loop over any CSS variables and assign those.
        // They can only be assigned using `setProperty`.
        elementStyle.setProperty(key, vars[key]);
    }
}
;
 //# sourceMappingURL=render.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/render.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "renderSVG",
    ()=>renderSVG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/render.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs [app-client] (ecmascript)");
;
;
;
function renderSVG(element, renderState, _styleProp, projection) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHTML"])(element, renderState, undefined, projection);
    for(const key in renderState.attrs){
        element.setAttribute(!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelCaseAttributes"].has(key) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelToDash"])(key) : key, renderState.attrs[key]);
    }
}
;
 //# sourceMappingURL=render.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "correctBorderRadius",
    ()=>correctBorderRadius,
    "pixelsToPercent",
    ()=>pixelsToPercent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/numbers/units.mjs [app-client] (ecmascript)");
;
function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min) return 0;
    return pixels / (axis.max - axis.min) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */ const correctBorderRadius = {
    correct: (latest, node)=>{
        if (!node.target) return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */ if (typeof latest === "string") {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$numbers$2f$units$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["px"].test(latest)) {
                latest = parseFloat(latest);
            } else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */ const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    }
};
;
 //# sourceMappingURL=scale-border-radius.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "correctBoxShadow",
    ()=>correctBoxShadow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/complex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
;
;
const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta })=>{
        const original = latest;
        const shadow = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5) return original;
        const template = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$complex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["complex"].createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */ const averageScale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number") shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number") shadow[3 + offset] /= averageScale;
        return template(shadow);
    }
};
;
 //# sourceMappingURL=scale-box-shadow.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addScaleCorrector",
    ()=>addScaleCorrector,
    "scaleCorrectors",
    ()=>scaleCorrectors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-box-shadow.mjs [app-client] (ecmascript)");
;
;
;
const scaleCorrectors = {
    borderRadius: {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius"
        ]
    },
    borderTopLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderTopRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomLeftRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    borderBottomRightRadius: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$border$2d$radius$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBorderRadius"],
    boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$box$2d$shadow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["correctBoxShadow"]
};
function addScaleCorrector(correctors) {
    for(const key in correctors){
        scaleCorrectors[key] = correctors[key];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}
;
 //# sourceMappingURL=scale-correction.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isForcedMotionValue",
    ()=>isForcedMotionValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/styles/scale-correction.mjs [app-client] (ecmascript)");
;
;
;
function isForcedMotionValue(key, { layout, layoutId }) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key) || key.startsWith("origin") || (layout || layoutId !== undefined) && (!!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$styles$2f$scale$2d$correction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scaleCorrectors"][key] || key === "opacity");
}
;
 //# sourceMappingURL=is-forced-motion-value.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeMotionValuesFromProps",
    ()=>scrapeMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs [app-client] (ecmascript) <locals>");
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const style = props.style;
    const prevStyle = prevProps?.style;
    const newValues = {};
    if (!style) return newValues;
    for(const key in style){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(style[key]) || prevStyle && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevStyle[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$is$2d$forced$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isForcedMotionValue"])(key, props) || visualElement?.getValue(key)?.liveStyle !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}
;
 //# sourceMappingURL=scrape-motion-values.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "scrapeMotionValuesFromProps",
    ()=>scrapeMotionValuesFromProps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
;
;
;
function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    for(const key in props){
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(props[key]) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$utils$2f$is$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isMotionValue"])(prevProps[key])) {
            const targetKey = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformPropOrder"].indexOf(key) !== -1 ? "attr" + key.charAt(0).toUpperCase() + key.substring(1) : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}
;
 //# sourceMappingURL=scrape-motion-values.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SVGVisualElement",
    ()=>SVGVisualElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/value/types/maps/defaults.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/is-svg-tag.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/render.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
class SVGVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMVisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBox"];
    }
    getBaseTargetFromProps(props, key) {
        return props[key];
    }
    readValueFromInstance(instance, key) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            const defaultType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$value$2f$types$2f$maps$2f$defaults$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDefaultValueType"])(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        key = !__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$camel$2d$case$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelCaseAttributes"].has(key) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$utils$2f$camel$2d$to$2d$dash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["camelToDash"])(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    }
    build(renderState, latestValues, props) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$build$2d$attrs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSVGAttrs"])(renderState, latestValues, this.isSVGTag, props.transformTemplate, props.style);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderSVG"])(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$svg$2f$utils$2f$is$2d$svg$2d$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSVGTag"])(instance.tagName);
        super.mount(instance);
    }
}
;
 //# sourceMappingURL=SVGVisualElement.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */ __turbopack_context__.s([
    "convertBoundingBoxToBox",
    ()=>convertBoundingBoxToBox,
    "convertBoxToBoundingBox",
    ()=>convertBoxToBoundingBox,
    "transformBoxPoints",
    ()=>transformBoxPoints
]);
function convertBoundingBoxToBox({ top, left, right, bottom }) {
    return {
        x: {
            min: left,
            max: right
        },
        y: {
            min: top,
            max: bottom
        }
    };
}
function convertBoxToBoundingBox({ x, y }) {
    return {
        top: y.min,
        right: x.max,
        bottom: y.max,
        left: x.min
    };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */ function transformBoxPoints(point, transformPoint) {
    if (!transformPoint) return point;
    const topLeft = transformPoint({
        x: point.left,
        y: point.top
    });
    const bottomRight = transformPoint({
        x: point.right,
        y: point.bottom
    });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x
    };
}
;
 //# sourceMappingURL=conversion.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "has2DTranslate",
    ()=>has2DTranslate,
    "hasScale",
    ()=>hasScale,
    "hasTransform",
    ()=>hasTransform
]);
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
    return !isIdentityScale(scale) || !isIdentityScale(scaleX) || !isIdentityScale(scaleY);
}
function hasTransform(values) {
    return hasScale(values) || has2DTranslate(values) || values.z || values.rotate || values.rotateX || values.rotateY || values.skewX || values.skewY;
}
function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
    return value && value !== "0%";
}
;
 //# sourceMappingURL=has-transform.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyAxisDelta",
    ()=>applyAxisDelta,
    "applyBoxDelta",
    ()=>applyBoxDelta,
    "applyPointDelta",
    ()=>applyPointDelta,
    "applyTreeDeltas",
    ()=>applyTreeDeltas,
    "scalePoint",
    ()=>scalePoint,
    "transformAxis",
    ()=>transformAxis,
    "transformBox",
    ()=>transformBox,
    "translateAxis",
    ()=>translateAxis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/utils/mix/number.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$utils$2f$has$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/utils/has-transform.mjs [app-client] (ecmascript)");
;
;
/**
 * Scales a point based on a factor and an originPoint
 */ function scalePoint(point, scale, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */ function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */ function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */ function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */ function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength) return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for(let i = 0; i < treeLength; i++){
        node = treePath[i];
        delta = node.projectionDelta;
        /**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */ const { visualElement } = node.options;
        if (visualElement && visualElement.props.style && visualElement.props.style.display === "contents") {
            continue;
        }
        if (isSharedTransition && node.options.layoutScroll && node.scroll && node !== node.root) {
            transformBox(box, {
                x: -node.scroll.offset.x,
                y: -node.scroll.offset.y
            });
        }
        if (delta) {
            // Incoporate each ancestor's scale into a cumulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$utils$2f$has$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasTransform"])(node.latestValues)) {
            transformBox(box, node.latestValues);
        }
    }
    /**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */ if (treeScale.x < TREE_SCALE_SNAP_MAX && treeScale.x > TREE_SCALE_SNAP_MIN) {
        treeScale.x = 1.0;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX && treeScale.y > TREE_SCALE_SNAP_MIN) {
        treeScale.y = 1.0;
    }
}
function translateAxis(axis, distance) {
    axis.min = axis.min + distance;
    axis.max = axis.max + distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */ function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$utils$2f$mix$2f$number$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixNumber"])(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */ function transformBox(box, transform) {
    transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}
;
 //# sourceMappingURL=delta-apply.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/utils/measure.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "measurePageBox",
    ()=>measurePageBox,
    "measureViewportBox",
    ()=>measureViewportBox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$apply$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/delta-apply.mjs [app-client] (ecmascript)");
;
;
function measureViewportBox(instance, transformPoint) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertBoundingBoxToBox"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$conversion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformBoxPoints"])(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode;
    if (scroll) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$apply$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translateAxis"])(viewportBox.x, scroll.offset.x);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$delta$2d$apply$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translateAxis"])(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
}
;
 //# sourceMappingURL=measure.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HTMLVisualElement",
    ()=>HTMLVisualElement,
    "getComputedStyle",
    ()=>getComputedStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/utils/measure.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/dom/DOMVisualElement.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/render.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$DOMVisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DOMVisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "html";
        this.renderInstance = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$render$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renderHTML"];
    }
    readValueFromInstance(instance, key) {
        if (__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$utils$2f$keys$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformProps"].has(key)) {
            return this.projection?.isProjecting ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultTransformValue"])(key) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$dom$2f$parse$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransformValue"])(instance, key);
        } else {
            const computedStyle = getComputedStyle(instance);
            const value = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$animation$2f$utils$2f$is$2d$css$2d$variable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCSSVariableName"])(key) ? computedStyle.getPropertyValue(key) : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$utils$2f$measure$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureViewportBox"])(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$build$2d$styles$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildHTMLStyles"])(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$html$2f$utils$2f$scrape$2d$motion$2d$values$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scrapeMotionValuesFromProps"])(props, prevProps, visualElement);
    }
}
;
 //# sourceMappingURL=HTMLVisualElement.mjs.map
}),
"[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ObjectVisualElement",
    ()=>ObjectVisualElement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/projection/geometry/models.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/VolunteerConnectHackathon/node_modules/motion/node_modules/motion-dom/dist/es/render/VisualElement.mjs [app-client] (ecmascript)");
;
;
function isObjectKey(key, object) {
    return key in object;
}
class ObjectVisualElement extends __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$render$2f$VisualElement$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VisualElement"] {
    constructor(){
        super(...arguments);
        this.type = "object";
    }
    readValueFromInstance(instance, key) {
        if (isObjectKey(key, instance)) {
            const value = instance[key];
            if (typeof value === "string" || typeof value === "number") {
                return value;
            }
        }
        return undefined;
    }
    getBaseTargetFromProps() {
        return undefined;
    }
    removeValueFromRenderState(key, renderState) {
        delete renderState.output[key];
    }
    measureInstanceViewportBox() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$VolunteerConnectHackathon$2f$node_modules$2f$motion$2f$node_modules$2f$motion$2d$dom$2f$dist$2f$es$2f$projection$2f$geometry$2f$models$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBox"])();
    }
    build(renderState, latestValues) {
        Object.assign(renderState.output, latestValues);
    }
    renderInstance(instance, { output }) {
        Object.assign(instance, output);
    }
    sortInstanceNodePosition() {
        return 0;
    }
}
;
 //# sourceMappingURL=ObjectVisualElement.mjs.map
}),
]);

//# sourceMappingURL=2693a_8cfe66b2._.js.map