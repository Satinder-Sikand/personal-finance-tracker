export class ExpenditureModel {
    description: string;
    amount: number|null;
    editing: boolean = false;

    constructor(description: string, amount: number) {
        this.description = description;
        this.amount = amount;
    }

}

export class GroupExpenditureModel {
    expenditures: ExpenditureModel[] = [];
    name: string;
    collapsed: boolean = false;

    constructor(name: string) {
        this.name = name;
    }
}


