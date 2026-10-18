const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 1000,
        origin : {},
        start: 0,
        end: 50,
    };

    world.origin.x = world.windowWidth / 2;
    world.origin.y = world.windowHeight / 2;

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

function drawNumberLine(world) {
    r.DrawLineEx({x: 0, y: world.origin.y}, {x: world.windowWidth, y: world.origin.y}, 2, r.WHITE);
    r.DrawCircle(world.origin.x, world.origin.y, 5, r.RED);
    r.DrawText("0", world.origin.x, world.origin.y, 5, r.WHITE);
}

function drawPoints(world) {
    for(let i=0; i<world.pointCount; i++) {
        const posX = world.pointX;
        const posY = world.pointY;

        r.DrawCircle(posX, posY, 10, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    
    // drawPoints(world);
    drawNumberLine(world);

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