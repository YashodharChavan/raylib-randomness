const r = require("raylib");

function setup() {
    const rectX = 40;
    const rectY = 50;
    const rectWidth = 200;
    const rectHeight = 200;

    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 100000,
        rectangle: {
            x: rectX,
            y: rectY,
            width: rectWidth,
            height: rectHeight,
        },
        circle: { radius: 50, x: rectX + 100, y: rectY + 100 },
    };

    world.points = generateRandomCoordinates(
        world.pointCount,
        rectX,
        rectY,
        rectWidth,
        rectHeight,
    );

    world.circlePointCount = countCirclePoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "A Random Point In a Rectangle",
    );
    r.SetTargetFPS(30);

    return world;
}

function isPointInside(world, X, Y) {
    return (
        (world.circle.x - X) ** 2 + (world.circle.y - Y) ** 2 <=
        world.circle.radius ** 2
    );
}

function generateRandomCoordinates(count, startX, startY, endX, endY) {
    const randomPoints = [];
    for (let i = 0; i < count; i++) {
        const randomX = generateRandom(startX, endX);
        const randomY = generateRandom(startY, endY);

        randomPoints.push({
            x: randomX,
            y: randomY,
        });
    }

    return randomPoints;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(start, end) {
    return start + Math.floor(Math.random() * end);
}

function drawPoints(world) {
    for (let i = 0; i < world.pointCount; i++) {
        r.DrawCircleV(world.points[i], 1, r.ColorAlpha(r.WHITE, 0.75));
    }
}

function countCirclePoints(world) {
    let count = 0;
    for (let i = 0; i < world.points.length; i++) {
        if (isPointInside(world, world.points[i].x, world.points[i].y)) count++;
    }

    return count;
}

function drawRectangle(world) {
    r.DrawRectangleLinesEx(world.rectangle, 3, r.WHITE);
}

function drawCircle(world) {
    r.DrawCircleLines(
        world.circle.x,
        world.circle.y,
        world.circle.radius,
        r.YELLOW,
    );
}

function drawArea(world) {
    const areaOfRect = world.rectangle.height * world.rectangle.width;
    const ratio = areaOfRect / world.pointCount;

    const areaOfCircle = ratio * world.circlePointCount;
    const textP = "p: " + areaOfCircle + "";
    const textA = "a: " + Math.PI * world.circle.radius ** 2;

    r.DrawText(textP, world.windowWidth - 130, 10, 20, r.WHITE);
    r.DrawText(textA, world.windowWidth - 130, 40, 20, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawRectangle(world);
    drawCircle(world);

    drawPoints(world);
    drawArea(world);

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
