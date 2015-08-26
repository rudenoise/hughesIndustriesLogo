var coords = require('./coordinates.json');
(function () {
    'use strict';
    var grid = [], y = 0;

    function plot(grid, path, char) {
        var i = 0;
        while (i < path.length) {
            grid[path[i][1]][path[i][0]] = char;
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
