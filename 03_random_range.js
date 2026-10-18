const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 1000,
        origin: {},
        start: -100,
        end: 100,
    };

    world.origin.x = world.windowWidth / 2;
    world.origin.y = world.windowHeight / 2;
    world.random = generateRandom(world.start, world.end);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Random Number Within Range");
    r.SetTargetFPS(30);

    return world;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}

function plotNumber(number, x, y, isRandom = false) {
    const textWidth = r.MeasureText(number + "", 20);
    const textX = x - textWidth / 2;
    const offsetY = isRandom ? -30 : 10
    const textY = y + offsetY;
    const color = isRandom? r.BLUE : r.RED;

    r.DrawCircle(x, y, 5, color);
    r.DrawText(number + "", textX, textY, 20, r.WHITE);
}

function drawNumberLine(world) {
    r.DrawLineEx(
        { x: 0, y: world.origin.y },
        { x: world.windowWidth, y: world.origin.y },
        2,
        r.WHITE,
    );
}

function plotNumbersOnLine(world) {
    plotNumber(0, world.origin.x, world.origin.y);
    plotNumber(world.start, world.origin.x + world.start, world.origin.y);
    plotNumber(world.end, world.origin.x + world.end, world.origin.y);
    plotNumber(world.random, world.origin.x + world.random, world.origin.y, true);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawNumberLine(world);
    plotNumbersOnLine(world);
    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while (isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    tearDown();
}

main();
