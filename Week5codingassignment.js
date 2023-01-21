//menu driven app that allow us to manage appointment info for the patient
//start by making the classes to structure the appointment information that will be added to the Patient

class Appointment { // appointment to be added to patient
    constructor(doctorName, date, time){
        this.doctorName = doctorName; // doctor name for appointment
        this.date = date; //date of appointment
        this.time = time; // time of appointment
        
    }
// add in the descibe method to return information about the appointment
    describe(){
       return `
       Appointment with ${this.doctorName} at ${this.time} on ${this.date}.`; 
    }
}

class Patient {
    constructor(name){
        this.name = name; //patient full name to be added by user;
        this.appointments = [];// array created because the patient can have multiple appointments
       
    }
    //add method to check if that appointment is an instance of our appointment class - this will keep people from being able to just pass in a string
    addAppointment(appointment){
        if(appointment instanceof Appointment){
            this.appointments.push(appointment);//this will push the appointment information entered in to be added to the appointment array
        }else{
            throw new Error(`You can only add in an instance of appointment. Argument is not an appointment:${appointment}`)
            //this ^^ will create error message to tell someone specifically what they entered wrong
        }
    }
//add in a method to describe the patients appointments
    describe(){
        return `${this.name} has ${this.appointments.length} appointments.`;

    }//this.appointments.length prints the number of appointments in the appointments array
}

//create a class for the menu app = drives the application and it's choices
class Menu {
    constructor(){ // no arguments
        this.patients = []; //initialize patients which is an array of patients because we can have multiple patients
        this.selectedPatient = null; //when managing patients we want to know which patient the user has selected
        // set this ^^ equal to null because when we start the menu there are no teams to start
    }
//add a method onto the menu
    start(){
        //this method will start the menu application
        let selection = this.showMainMenuOptions();//using methods that don't exist yet to build out what we think the menu is going to look like
        //top down programming this ^^ method will be used to show the main menu at the start of application
        while(selection !=0){ // this is where we get the selection from the user
            switch (selection){
                case '1':
                    this.createPatient();// if they choose one it will create a patient- this method create patient that we will build out later
                    break;
                case '2':
                    this.viewPatient();// view patient
                    break;
                case '3':
                    this.deletePatient();// delete patient
                    break;
                case '4':
                    this.displayPatients();//display all all patients
                    break;
                default:
                    selection = 0;
            }
            //while still inside the for loop you want to get the selction again like we do at the beginning so that it keeps looping as long as we don't select zero or somthing other than 4
            selection = this.showMainMenuOptions();
        }


        alert('Goodbye!'); // this is outside the for loop and this will close out the application
    }

    //now we need to program the implementation of the methods we named up above
    showMainMenuOptions(){
        //the prompt method is going to make a pop up window come up for the main menu options and it can say whatever you want it to
        return prompt(`
        0) exit
        1) add new patient
        2) view patient info
        3) delete patient
        4) display all patients
        `);
    }

    showPatientMenuOptions(patientInfo){
        return prompt(`
        0) back
        1) create appointment
        2) delete appointment
        3) add symptoms
        ----------------
        ${patientInfo}
        `);
    }

    displayPatients(){
        let patientString = ''; //start with a blank string bc we need to build a string that has all the information for the patient to put into a prompt
        for(let i = 0; i < this.patients.length; i++){ // iterate through our array of teams
            //& then concatenate all the patient's information by grabbing each index number of the patient in the array (i) then getting the name of that patient (this.patient[i].name)
            patientString += i + ') ' + this.patients[i].name + '\n'; // so all the team names will show up with an index (i) next to them then ') ' and then the teams name and then return a new line
        }
        //outside the for loop you want to alert the teamString so display the team names
        alert(patientString);
    }
//wont have anything to display if we do not create a team - the method beoow creates team
    createPatient(){
        let name = prompt('Enter FULL name of patient:'); //prompt to get the name of the patient
        this.patients.push(new Patient(name))//teams is the array where we are keeping all the teams so we want to add the new TEAM INSTANCE to the array 
        //this ^^ is getting the team name from the prompt and creating the new instance of the class TEAM
    }
//next we want to create the view patient method that will then display the Patient menu option and their info
    viewPatient(){
       //start by asking the user what they want to view
       let index = prompt('Enter the index of the Patient you wish to view:')
       if(index > -1 && index < this.patients.length){// <--- this will validate the users input because we don't want the program to through back an error
        this.selectedPatient = this.patients[index]; // this will turn the selected index number into the patients first name
       //now we can build the description for the appointment to create the list of appointments for patients
        let description = 'Patient: ' + this.selectedPatient.name + '\n'; // this will combine the selected patient name in a string and create a new line
        //now we are going to loop through the patients and build the list of names of team players from which the user is choosing from
        for(let i = 0; i < this.selectedPatient.appointments.length; i++){
            description += (i+1) + ') Appointment with ' + this.selectedPatient.appointments[i].doctorName + ' at ' 
            + this.selectedPatient.appointments[i].time + ' on ' + this.selectedPatient.appointments[i].date
            + '\n' ;
        }

        let selection = this.showPatientMenuOptions(description); // this method has not been created yet (top down programming)
        // we put the list of patients appointment info (which is description) and we insert into the method
        // now we will use a switch case for the user to add an appointment from the patient menu
        switch (selection){
            case '1':
                this.addAppointment();// create new appointment
                break;
            case '2':
                this.deleteAppointment();// delete appointment
                break;
            case '3':
                this.addSymptoms();
                
        }

       }

    }


    addSymptoms(){
        let symptoms = prompt(`Enter the symptoms reported by patient:`)
        for(let i = 0; i < this.selectedPatient.appointments.length; i++){
           let description = 'Patient: ' + this.selectedPatient.name + '\n' + (i+1) + ') Appointment with ' + this.selectedPatient.appointments[i].doctorName + ' at ' 
            + this.selectedPatient.appointments[i].time + ' on ' + this.selectedPatient.appointments[i].date
            + '\n' + 'Symptoms: ' + symptoms;
            alert(this.showPatientMenuOptions(description))
        }
        
    }

    deletePatient(){
        let index = prompt('Enter the index of the patient you wish to delete:');
        if(index > -1 && index < this.patients.length){
            this.patients.splice(index, 1);
        } 
    }

    addAppointment(){
        let doctorName = prompt(`Enter doctor name:`);
        let date = prompt(`Enter next appointment date:`);
        let time = prompt(`Enter next appintment time:`);
        this.selectedPatient.appointments.push(new Appointment(doctorName, date, time));
    }

    deleteAppointment(){
        let index = prompt('Eneter the index of the appointment you wish to delete:');
        if(index > -1 && index < this.selectedPatient.appointments.length){
            this.selectedPatient.appointments.splice(index, 1);
        }
    }

}

//have to create an instance of our menu to test it
let menu = new Menu();
menu.start();

//left off at creating the method for adding an appointment
