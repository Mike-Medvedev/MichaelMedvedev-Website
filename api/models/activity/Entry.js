import Activity from "./Activity.js"
import ActivityDate from "./ActivityDate.js"
class ActivitiesEntry{
    #activities;
    #date;
    constructor(date, activities = []){
        this.#date = new ActivityDate(date);
        if(activities.every(activity => !!(activity instanceof Activity))){
            this.#activities = [...activities]
            Object.freeze(this) // make instance immutable
        }
        else throw new Error("Activties collection must only contain objects of type Activity")
        
    }
    add(activities){
        if(Object.hasOwn(activities, "length")){ //if array then spread objs
            this.#activities.push(...activities)
        }
        else this.#activities.push(activities)
    }
    modelDump(){
        return [...this.#activities]
    }
}

let date = new Date().toISOString().split("T")[0];
let x = new Activity("t", "coding");
let v  = new ActivitiesEntry(date, [x])