class Subscription {
    constructor(title, cost, renews) {
        this.title = title;
        this.cost = cost;
        this.renews = renews;
    }

    describe() {
        return `${this.title} costs ${this.cost} dollars and renews on ${this.renews}.`;
    }
}
/* tested with console.log instead of return and class code works
let subscription1 = new Subscription("Real Simple", 20, "03/01/21");

subscription1.describe();*/

class Subscriber {
    constructor(subscriber) {
        this.subscriber = subscriber;
        this.subscriptions = [];
    }

    addSubscription(subscription) {
        if (subscription instanceof Subscription) {
            this.subscriptions.push(subscription);
        } else {
            throw new Error(`You can only add a subscription name. Argument is not a subscription: ${subscription}`);
        }
    }

    describe() {
        return `${this.subscriber} has ${this.subscriptions.length} subscription(s)`;
    }
}

class Menu {
    constructor() {
        this.subscribers = [];
        this.selectedSubscriber = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createSubscriber();
                    break;
                case '2':
                    this.viewSubscriber();
                    break;
                case '3': 
                    this.deleteSubscriber();
                    break;
                case '4':
                    this.displaySubscribers();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert(`Until we meet again`);
    }

    showMainMenuOptions() {
        return prompt(`
        0) Exit menu
        1) Create a new subscriber
        2) View an existing subscriber account
        3) Delete subscriber
        4) Display all subscribers
        `);
    }

    showSubscriberAccountOptions(accountInfo) {
        return prompt(`
        0) back
        1) create subscription
        2) delete subscriptions
        3) view subscriptions
        ------------------------
        ${accountInfo}
        ${this.selectedSubscriber.describe()}
        `);
    }

   
    createSubscriber() {
        let name = prompt('Please enter the name of the new subscriber: ');
        this.subscribers.push(new Subscriber(name));
    }

    viewSubscriber() {
        let index = prompt('Please enter the index of the subscriber account name you wish to view: ');
        if (index > -1 && index < this.subscribers.length) {
            this.selectedSubscriber = this.subscribers[index];
            let description = 'Subscriber Account Name: ' + this.selectedSubscriber.subscriber + '\n';

            for (let i = 0; i < this.selectedSubscriber.subscriptions.length; i++) {
                description += i + ') ' + this.selectedSubscriber.subscriptions[i].title + ' cost ' + 
                this.selectedSubscriber.subscriptions[i].cost + ' and renews on ' + this.selectedSubscriber.subscriptions[i].renews + '\n';
            }

            let selection = this.showSubscriberAccountOptions(description);
                while (selection != 0) {  
              
                    switch(selection) {
                        case '1':
                            this.createSubscription();
                            break;
                        case '2':
                            this.deleteSubscription();
                            break;
                        case '3':
                            this.displaySubscriptions();
                            break;
                        default:
                            selection = 0;
                    }
                    selection = this.showSubscriberAccountOptions(description);
                }
                alert(`Returning to main menu`);
        }        
    }
        
    deleteSubscriber() {
       let index = prompt('Note: this process cannot be undone. Please enter the index of the subscriber you with to delete: ');
       if (index > -1 && index < this.subscribers.length) {
           this.subscribers.splice(index,1);
       } 
    }
     
    displaySubscribers() {
        let subscriberString = '';
        for (let i = 0; i < this.subscribers.length; i++) {
            subscriberString += i + ') ' + this.subscribers[i].subscriber + '\n';
        }
        alert(subscriberString);
    }

    createSubscription() {
        let title = prompt('Please enter the name of the new subscription: ');
        let cost = prompt('Please enter the cost of the new subscription: ');
        let renews = prompt('Please enter the month/day/year in xx/xx/xx format for when the new subscription will renew: ');
        this.selectedSubscriber.subscriptions.push(new Subscription(title, cost, renews));
    }

    deleteSubscription() {
        let index = prompt('Note: this process cannot be undone. Please enter the index of the subscription you wish to delete: ');
        if (index > -1 && index < this.selectedSubscriber.subscriptions.length) {
            this.selectedSubscriber.subscriptions.splice(index,1);
        }
    }

    displaySubscriptions() {
        let subscriptionString = '';
        for (let i = 0; i < this.selectedSubscriber.subscriptions.length; i++) {
            subscriptionString += i + ') ' + this.selectedSubscriber.subscriptions[i].title + ' cost ' + 
            this.selectedSubscriber.subscriptions[i].cost + ' and renews on ' + this.selectedSubscriber.subscriptions[i].renews + '\n';
        }
        alert(subscriptionString);
    }

}

let menu = new Menu();
menu.start();


