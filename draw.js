var coords = require('./coordinates.json');
(function () {
    'use strict';
    var grid = [], y = 0;

    function drawLine(from, to, grid, char) {
        var x = from[0],
            y = from[1],
            toX = to[0],
            toY = to[1];
        // draw line down
        if (x === toX) {
            while(y < to[1]) {
                grid[y][x] = char;
                y += 1;
            }
        }
        // draw line across
        if (y === toY) {
            while(x < to[0]) {
                grid[y][x] = char;
                x += 1;
            }
        }
    }

    function plot(grid, path, char) {
        var i = 0, last, next;
        while (i < path.length) {
            next = path[i];
            if (last && next) {
                // draw line
                if (last[0] === next[0]) {
                    last[1] < next[1] ?
                        drawLine(last, next, grid, char) :
                        drawLine(next, last, grid, char);
                } else {
                    last[0] < next[0] ?
                        drawLine(last, next, grid, char) :
                        drawLine(next, last, grid, char);
                }
            }
            grid[next[1]][next[0]] = char;
            last = next;
            i += 1;
        } 
        return grid;
    }

    function printGrid(grid) {
        var i = 0;
        while (i < grid.length) {
            console.log(grid[i].join(''));
            i += 1;
        }
    }

    while (y < coords.height) {
        grid.push(Array.apply(null, Array(coords.width)).map(function () {
            return ' ';
        }));
        y += 1;
    }

    grid = plot(grid, coords.H, 'H');
    grid = plot(grid, coords.I, 'I');

    printGrid(grid);
}());
