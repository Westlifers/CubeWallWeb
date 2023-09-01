export function get_m_n_cube_of_wall(m: number, n: number, wall: number[][]) {
    const cube: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
    for (let i=0; i<=2; i++) {
        for (let j=0; j<=2; j++) {
            cube[i][j] = wall[m * 3 + i][n * 3 + j]
        }
    }

    return cube
}


export const COLOR_DICT = {
    0: 'yellow',
    1: 'white',
    2: 'red',
    3: 'orange',
    4: 'blue',
    5: 'green',
}
