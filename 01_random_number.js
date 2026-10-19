const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 1000,
    };

    world.pointX = generateRandom(world.windowWidth);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Random Position");
    r.SetTargetFPS(30);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(end) {
    return Math.floor(Math.random() * end);
}

function drawPoints(world) {
    for(let i=0; i<world.pointCount; i++) {
        const start = {
            x: world.pointX,
            y: 0
        }

        const end = {
            x: world.pointX,
            y: world.windowHeight
        }

        r.DrawLineEx(start, end, 2, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);
    
    drawPoints(world);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while(isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup()
    loop(world);
    tearDown();
}

main();