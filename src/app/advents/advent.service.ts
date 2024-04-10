import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Advent } from './advent.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdventService {

  private advents: Advent[] = [];
  adventSelectedEvent = new EventEmitter<Advent>();  
  adventListChangedEvent = new Subject<Advent[]>();
  dbURI = "http://localhost:3000/advents";

  constructor(private http: HttpClient) { 
    this.initializeData();
  }

  // ********************************
  // load advents
  // ********************************
  initializeData() {
    console.log("get advents in init ...");

    // send get request to Express
    this.http.get<{message: string, advents: Advent[]}>(this.dbURI)
      .subscribe((adventData) => {
        this.advents = adventData.advents;
        // this.sortAdvents();
        // pass a copy of advents
        this.adventListChangedEvent.next([...this.advents]);
      });

    /*    
      this.advents = [
        {
          id: '1',
          name: 'Advent 1',
          description: 'desc 1',
          link: 'link 1',
          timestamp: ''
        },
        {
          id: '2',
          name: 'Advent 2',
          description: 'desc 2',
          link: 'link 2',
          timestamp: ''
        },
        {
          id: '3',
          name: 'Advent 3',
          description: 'desc 3',
          link: 'link 3',
          timestamp: ''
        },
      ];
    */

    // console.log([...this.advents]);
    // add to observable in future
    // this.adventListChangedEvent.next([...this.advents]);
  }

  // ********************************
  // Sort advents in ascending order by name (title)
  // ********************************
  sortAdvents() {


  }

  // ********************************
  // Return all advents
  // ********************************
  getAdvents() {
    console.log("get advents in getAdvents ...");
    //console.log("get advents from MongoDB in services ...");

    this.initializeData();
  }

  // ********************************
  // Return prduct matching id or, if not found, return null
  // ********************************
  getAdvent(id: string) {
    console.log("getAdvent() Lookup: ", id)
    
    // Using return inside a forEach loop exits the loop, not the function
    // Instead, use find to return the advent or null if not found
    return this.advents.find(advent => advent.id === id);
  }

  // ********************************
  // Add a new advent
  // ********************************
  addAdvent(newAdvent: Advent) {
    console.log("Request new advent in services:", newAdvent.name);
    if (!newAdvent) {
      // Abort if advent wasn't passed
      return;
    }
    
    // make sure new Advent id is empty
    newAdvent.id = '';

    // send post request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, advent: Advent }>(this.dbURI, newAdvent, { headers: headers })
    .subscribe(
      (responseData) => {
        // add new advent to advents
        this.advents.push(responseData.advent);
        //this.sortAdvents();
        this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
      }
    );

    // Add _id
    // newAdvent._id = "" + this.maxAdventId + 5;
    

    // Push a new advent onto the list and emit change
    // this.maxAdventId++;
    // newAdvent.id = "" + this.maxAdventId;
    // newAdvent.id = "" + 10;
    // this.advents.push(newAdvent);

    // Save changes to Firebase
    // this.storeAdvents();
    // let adventsListClone = this.advents.slice();
    // this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
  }

  // ********************************
  // Update an existing advent
  // ********************************
  updateAdvent(originalAdvent: Advent, newAdvent: Advent) {
    console.log("Update existing advent:", originalAdvent.id, originalAdvent.name);
    
    if (!originalAdvent || !newAdvent) {
      // Abort if either advent is undefined
      return;
    }

    let pos = this.advents.indexOf(originalAdvent);
    if (pos < 0) {
      // Abort if original advent can't be found
      return;
    }

    // send update request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
     this.http.put(this.dbURI + "/" + originalAdvent.id, newAdvent, { headers: headers })
      .subscribe(
        (responseData) => {
          // replace updated advent in advents
          newAdvent.id = originalAdvent.id;
          this.advents[pos] = newAdvent;
          // this.sortAdvents();
          this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
        }
      );

    // Set id of new advent and replace in list
    // newAdvent.id = originalAdvent.id;
    // this.advents[pos] = newAdvent;

    // Save changes to Firebase
    // this.storeAdvents();
    // let adventsListClone = this.advents.slice();
    // this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
  }

  // ********************************
  // Delete a advent from advents
  // ********************************
  deleteAdvent(advent: Advent) {
    console.log("Delete existing advent:", advent.id, advent.name);

    if (!advent) {
      // Abort if advent wasn't passed
      return;
    }

    const pos = this.advents.indexOf(advent);
    if (pos < 0) {
      // Abort if advent doesn't exist
      return;
    }

    // send delete request to Express
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.delete(this.dbURI + "/" + advent.id, { headers: headers })
      .subscribe(
        (responseData) => {
          // Remove contact from list
          this.advents.splice(pos, 1);
          this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
        }
      );

    // Remove advent from list
    // this.advents.splice(pos, 1);
    //this.adventChangedEvent.emit(this.advents.slice());
    
    // Save changes to Firebase
    // this.storeContacts();
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone); // pass event to any subscribers
    // this.adventListChangedEvent.next(this.advents.slice()); // pass event to any subscribers
  }
}