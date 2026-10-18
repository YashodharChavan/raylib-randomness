const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "TITLE");
    r.SetTargetFPS(60);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function draw(world) {
    r.BeginDrawing();

    r.DrawRectangle(10, 10, 40, 40, r.RED);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};