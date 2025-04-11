import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { evaluate } from 'mathjs';


@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  enterValue: string = '';
  finalResult: string = '';

  onInputChange(value: string) {
    const opentCount = (this.enterValue.match(/\(/g) || [])?.length;
    const closeCount = (this.enterValue.match(/\)/g) || [])?.length;

    if (value === '=') {
      this.evaluateExpression();
    } else if (value === 'C') {
      this.enterValue = '';
    } else if (value === 'Back') {

      this.enterValue = this.enterValue.slice(0, -1);
      const lastChar = this.enterValue[this.enterValue.length - 1];
      if (!isNaN(Number(lastChar))) {
        this.evaluateExpression();
      }

    } else if(value === '('){
      opentCount > closeCount ? this.enterValue += ')' : this.enterValue += '(';
      opentCount > closeCount && this.evaluateExpression();
    }else {
      this.enterValue += value;
      if(!('% x + - ÷ ('?.includes(value)) && opentCount===closeCount){
        this.evaluateExpression()
      }
    }
    
  }

  clearInput():void{
    this.enterValue=''
    this.finalResult=''
  }

  evaluateExpression() {
    try {
      const expression = this.enterValue
        .replace(/x/g, '*')
        .replace(/÷/g, '/')
        .replace(/(\d+)%(\d+)/g, '($1/100)*$2')
        .replace(/(\d+)%/g, '($1/100)')       
        .replace(/(\d)(\()/g, '$1*(');         
  
      const result = evaluate(expression);
  
      this.finalResult = parseFloat(result)
        .toFixed(4)
        .replace(/\.?0+$/, '')
        .toString();
    } catch (error) {
      this.finalResult = 'Error';
    }
  }
  

  calculateResult():void{
    this.onInputChange("=")
  }
}
