import { Component } from '@angular/core';
import { ExpenditureModel, GroupExpenditureModel } from './expenditure-model';

@Component({
  selector: 'app-expenditure-tracker',
  templateUrl: './expenditure-tracker.component.html',
  styleUrls: ['./../app.component.css','./expenditure-tracker.component.css']
})
export class ExpenditureTrackerComponent {
  // Keeps track of the list of expenditures
  expenditures: Map<string, GroupExpenditureModel> = new Map<string, GroupExpenditureModel> ([["other", new GroupExpenditureModel("Other")]]);
  description: string = '';
  amount: string = '';

  addGroup(name: string): void {
    if (this.expenditures.has(name.toLowerCase())){
      alert("This group already exists.");
    } else if (!name||name.replace(" ", "").length==0) {
      alert("This is not a valid name.");
    } else {
      this.expenditures.set(name.toLowerCase(), new GroupExpenditureModel(name));
    }
  }

  deleteGroup(name: string): void {
    if (this.expenditures.has(name.toLowerCase())) {
      this.expenditures.delete(name.toLowerCase());
    } else {
      alert("There is no group with that name.");
    }
  }

  highlightCard(id: string):void {
    let card = document.getElementById(id+'id');
    if (card)
      card.classList.add('highlight');
  }

  removeHighlightCard(id:string): void {
    let card = document.getElementById(id+'id');
    if (card)
      card.classList.remove('highlight');
  }

  highlightExpenditure(group: string, index: number): void {
    let expenditure = document.getElementById(group+index+'id');
    if (expenditure)
      expenditure.classList.add('highlight');
  }

  removeHighlightExpenditure(group: string, index: number): void {
    let expenditure = document.getElementById(group+index+'id');
    if (expenditure)
      expenditure.classList.remove('highlight');
  }

  getGroups(): string[] {
    let groups: string[] = [];
    for (let g of this.expenditures.values()) {
      groups.push(g.name);
    }
    return groups;
  }

  getGroupValues(): GroupExpenditureModel[] {
    return Array.from(this.expenditures.values());
  }

  // Check whether the amount given is a valid amount
  checkInValid(amount: string): boolean {
    const invalid = !amount || isNaN(Number(amount)) || Number(amount)<0;
    return invalid;
  }

  // This function is called when the user submits the form to add a new expenditure
  goodExpenditure(group: string): void {
    // Check if the amount is a valid number
    if (!this.checkInValid(this.amount)) { 
      //Add expenditure 
      this.addExpenditure(this.description, Number(this.amount), group.toLowerCase());
      this.description = '';
      this.amount='';
    } else
      alert("Please ensure that you input a valid number.");
  }

  // This function is called to add a new expenditure
  addExpenditure(descriptions: string, amount: number, group: string): void {
    // Push a Expenditure object into the expenditures array
    // this.expenditures.push(new ExpenditureModel(descriptions, amount));
    this.expenditures.get(group)?.expenditures.push(new ExpenditureModel(descriptions, amount));
    
  }

  editExpenditure(index: number, group:string, target?: any): void {
    group = group.toLowerCase();
    let expenditure = this.expenditures.get(group)!.expenditures[index];
    if (!expenditure?.editing) {
      expenditure.editing = !expenditure.editing;
    } else {
      if (target) {
        if (!this.checkInValid((expenditure.amount??-1).toString())) {
          expenditure.editing=!expenditure.editing;
          target.classList.remove('error');
        } else {
          target.classList.add('error');
          alert("Please ensure that you input a valid number.");
          setTimeout(()=>{target.focus();}, 1);
        }
      } else {
        expenditure.editing=!expenditure.editing;
      }
      
    }
  }

  deleteExpenditure(index: number, group:string): void {
    this.expenditures.get(group.toLowerCase())!.expenditures.splice(index, 1);
  }

  calculateGroupTotal(name: string): string|undefined {
    let total: number = 0;
    const group: GroupExpenditureModel = this.expenditures.get(name.toLowerCase())!;
    try {
      group.expenditures.forEach(expenditure => {
        total+=expenditure.amount??0;
      }); 
    } catch (error) {
      return undefined;
    }
    return total.toFixed(2);
  }
  
  // This function calculates the total amount of all expenditures in the list
  calculateTotal(): string|undefined {
    // Use the reduce function to sum up all the amounts in the expenditures array
    // The 0 in reduce is the initial value of the total
    try {
      let total: number = 0;
      for (let group of this.expenditures.values()) {
        total += group.expenditures.reduce((gtotal, expenditure)=> gtotal + (expenditure.amount??0), 0);
      }
      return total.toFixed(2);
    } catch (error) {
      return undefined;
    }
    
  }
}