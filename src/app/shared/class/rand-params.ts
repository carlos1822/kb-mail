
export class RandonParams{

    private texts: string[] = ["linea?1254789653","prestaciones?25365879","avances?253658975","beneficiarios?251463698","simuladores?25365214","productos?22536528","inversiones?25365874","hipotecarios?25365274","inversionistas?25413526","personales?253c52d5","extranjeros?2536c52f5"];

    constructor(){
        const stateObj = "";
        const numbere = this.getRandomArbitrary(10,15);
        const token = this.generateToken(numbere, "1234567abcdefghijklmnopq");
        const randValue = this.texts[Math.floor(Math.random() * this.texts.length)];
        history.pushState(stateObj, "Counter", `${randValue}${token}`);
    }

    private getRandomArbitrary(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private generateToken(len: number, arr:string){
        let ans = "";
        for (let i = len; i > 0; i--) {
          ans += arr[Math.floor(Math.random() * arr.length)];
        }
        return ans;
    }
    
}