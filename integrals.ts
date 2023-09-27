interface IntParams {
  point_amount: number;
  step: number;
  accuracy: number;
}

abstract class Integralis {
  point_amount: Function;
  step: Function;
  accuracy: Function;

  constructor() {
    this.point_amount = (a, b, step) => {
      return (b - a) / step; 
    };

    this.step = (a, b, point_amount) => {
      return (b - a ) / point_amount; 
    };
  };

  public abstract calc(func, a, b, { point_amount, step, accuracy }: IntParams): number;
}

class SimpsonsMethod extends Integralis {
  public calc(func: any, a: any, b: any, { point_amount, step, accuracy }: IntParams): number {
    let n;

    if(point_amount !== 0) n = point_amount;
    else n = this.point_amount(a, b, step);
    
    let n2 = n*2, h=(b-a)/n2;
    
    let sum = func(a) + func(b);

    for(let i=1; i < n2; i+=2) {
      sum += 4*func(a + i*h)
    }

    for(let i=2; i<n2-1; i+=2) {
      sum += 2*func(a + i*h)
    };

    return sum * h / 3

  }
}

class TrapezoidMethod extends Integralis {
  public calc(func: Function, a: number, b: number, { point_amount, step, accuracy }: IntParams): number {
    let n;
    let calc_step;

    if(step == 0) {
      calc_step = this.step(a, b, point_amount);
      n = (b - a) / calc_step;
    }
    else {
      n = (b - a) / step; calc_step = step
    };
    
    let sum = 0;
    
    
    for(let i = 1; i <= n; i++) {
    
      let x0 = a + (i-1)*calc_step;
      let x1 = a + i*calc_step;
      
      let Ai = calc_step * (func(x0) + func(x1))/ 2.;
          
      sum += Ai	
      
    } 

      return sum;
  }
}

const simpMethodImpl = new SimpsonsMethod();
console.log(simpMethodImpl.calc((x) => {
  return x**2
}, 0, 1, {
  point_amount: 100,
  step: 0,
  accuracy: 0
}));

console.log(simpMethodImpl.calc((x) => {
  return x**2
}, 0, 1, {
  point_amount: 0,
  step: 0.01,
  accuracy: 0
}));

const trapMethodImpl = new TrapezoidMethod();
console.log(trapMethodImpl.calc((x) => {
  return x**2
}, 0, 1, {
  point_amount: 100,
  step: 0,
  accuracy: 0
}));

console.log(trapMethodImpl.calc((x) => {
  return x**2
}, 0, 1, {
  point_amount: 0,
  step: 0.01,
  accuracy: 0
}));