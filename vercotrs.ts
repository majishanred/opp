import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class Point {
  public x: number;
  public y: number;
  public z: number;
  constructor(x: number, y: number, z:number) {
    this.x = x;
    this.y = y;
    this.z = z;
  };
};

class Vector {
  public x: number;
  public y: number;
  public z: number;
  public length: number;
  
  constructor(point: Point, point2?: Point) {
    if(point2 == undefined) {
      this.x = point.x;
      this.y = point.y;
      this.z = point.z;
    } else {
      this.x = point2.x - point.x;
      this.y = point2.y - point.y;
      this.z = point2.z - point.z;
    };

    this.length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  
  toString() {
    return `x: ${this.x}, y: ${this.y}, z: ${this.z}`;
  }

  add(vector: Vector): Vector {
    const point = new Point(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    return new Vector(point);
  };

  subtract(vector: Vector): Vector {
    const point = new Point(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    return new Vector(point);
  }

  normalize(): Vector {
    const point = new Point(this.x / this.length, this.y / this.length, this.z / this.length);
    return new Vector(point);
  }

  reverse(): Vector {
    const point = new Point(-1 * this.x, -1 * this.y, -1 * this.z);
    return new Vector(point);
  }

  static scallar(vector1: Vector, vector2: Vector): number {
    return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
  }

  static cross_product(vector1: Vector, vector2: Vector): Vector {
    const point = new Point(
      vector1.z * vector2.y - vector1.y * vector2.z,
      vector1.x * vector2.z - vector1.z * vector2.x,
      vector1.y * vector2.x - vector1.x * vector2.y
    );

    return new Vector(point);
  }

  static range(vector1: Vector, vector2: Vector): number {
    return (vector1.x - vector2.x)**2 + (vector1.y - vector2.y)**2 + (vector1.z - vector2.z)**2;
  }
 
  static angle(vector1: Vector, vector2: Vector): number {
    return Vector.scallar(vector1, vector2) / (vector1.length + vector2.length);
  }
}

const rl = readline.createInterface({ input, output });

let answer = await rl.question("Выберите как задать координаты вектора, одной точкой или двумя?\n");
let vector1;
let vector2;

switch(answer) {
  case("1"): {
    const coords = (await rl.question("Введите координаты вектора через пробел\n")).split(" ").map((elem) => { return +elem});
    const point = new Point(coords[0], coords[1], coords[2]);
    vector1 = new Vector(point);
    break;
  };
  case("2"): {
    const coords1 = (await rl.question("Введите координаты точки 1 через пробел\n")).split(" ").map((elem) => { return +elem});
    const point1 = new Point(coords1[0], coords1[1], coords1[2]);
    const coords2 = (await rl.question("Введите координаты точки 2 через пробел\n")).split(" ").map((elem) => { return +elem});
    const point2 = new Point(coords2[0], coords2[1], coords2[2]);
    vector1 = new Vector(point1, point2);
    break;
  };
};

answer = await rl.question("Выберите как задать второго координаты вектора, одной точкой или двумя?\n");

switch(answer) {
  case("1"): {
    const coords = (await rl.question("Введите координаты вектора через пробел\n")).split(" ").map((elem) => { return +elem});
    const point = new Point(coords[0], coords[1], coords[2]);
    vector2 = new Vector(point);
    break;
  };
  case("2"): {
    const coords1 = (await rl.question("Введите координаты точки 1 через пробел\n")).split(" ").map((elem) => { return +elem});
    const point1 = new Point(coords1[0], coords1[1], coords1[2]);
    const coords2 = (await rl.question("Введите координаты точки 2 через пробел\n")).split(" ").map((elem) => { return +elem});
    const point2 = new Point(coords2[0], coords2[1], coords2[2]);
    vector2 = new Vector(point1, point2);
    break;
  };
};

const variants = [
  "1. Нормализовать 1 введенный вектор",
  "2. Обратный вектор к 1",
  "3. Сложение векторов",
  "4. Вычитание векторов (из 1 вычесть 2)",
  "5. Скалярное произведение",
  "6. Векторное произведение",
  "7. Расстояние между векторами",
  "8. Угол между векторами"
];

variants.forEach((elem) => {
  console.log(elem);
})

answer = await rl.question("Выберете действие с векторами\n");

switch(answer) {
  case("1"): {
    console.log(`${vector1.normalize()}`);
    break;
  }
  case("2"): {
    console.log(`${vector1.reverse()}`);
    break;
  }
  case("3"): {
    console.log(vector1.add(vector2));
    break;
  }
  case("4"): {
    console.log(vector1.subtract(vector2));
    break;
  };
  case("5"): {
    console.log(Vector.scallar(vector1, vector2));
    break;
  };
  case("6"): {
    console.log(Vector.cross_product(vector1, vector2));
    break;
  }
  case("7"): {
    console.log(Vector.range(vector1, vector2));
    break;
  }
  case("8"): {
    console.log(Vector.angle(vector1, vector2));
    break;
  }
}