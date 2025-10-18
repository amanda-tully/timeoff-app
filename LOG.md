# Project log

## TODO
[x] Read and understand brief, copy to ChatGPT and see what it has to say <br>
[x] Check out ionic docs and setup project <br>
[x] Initialize project on Github <br>
[x] Watch video about Ionic with React (https://www.youtube.com/watch?v=xn-qpnT2n3Q)  <br>
[x] Create wireframes <br>
[x] Identify components to built and components to use from ionic framework <br>
[x] Setup storybook <br>
[x] Install xcode and android studio and setup capacitor <br>
[x] Add card component <br>
[x] Add card component to storybook <br>
[x] Write unit test for card component <br>
[x] Add pagination component and link to storybook <br>
[x] Add pagination unit test <br>
[x] Add list component and link to storybook <br>
[x] Add list unit test <br>
[x] Add navigation <br>
[x] Add user switch toggle <br>
[x] Add components to pages <br>
[x] Write business logic for time off requests and approvals <br>
[x] Update theme <br>
[x] Add integration tests <br>
[x] Write readme


## Understanding brief
Thursday 11:00 - 11:20.  <br>
I will focus first on building the UI components that ionic doesn't have. I want to keep state and other business logic out of my UI components. 
My approach will be to sketch something out in Figma to make it easier to identify what I need to build and where I want to add it to the page.
Then I want to go from bottom up, adding a skeleton component and immediately linking it to a story and a unit test. After I've done this same approach
with all the components I need to build myself, I will focus on switching users and adding the items to the page.


## Ionic docs and project setup
Thursday 11:20 - 12:00 <br>
I've followed the guide on how to set up a project with ionic+react. I've briefly gone over the components they offer. I noticed there is theming, 
I want to go for a light theme. I'll have to research further on how to adjust the theme with my own colors. 
I want to go over the other docs they have later.

## Initialize project on Github
Thursday 13:40 - 13:45 <br>
Project created on github and .gitignore plus this file added.

## Note to self
At first, I thought I could just have one toggle to switch between users, and they would each have their one view.
Thinking about it more, a supervisor could have a supervisor and would need to be able to put in their own requests as well. 
So in case this is true, I need this user type to have access to both views.
```aiignore
person1 = {
    id: 1,
    name: Emma,
    supervisorId: 3,
    employeesToSupervise: [] 
}

person2 =  {
    id: 2,
    name: Bob,
    supervisorId: 3,
    employeesToSupervise: [] 
}

person3 =  {
    id: 3
    name: Anna,
    supervisorId: 4
    employeesToSupervise: [1,2] 
}


person4 = {
    id: 4
    name: Frank,
    supervisorId: null
    employeesToSupervise: [3] 
}

```

##  Watch video about Ionic with React
Thursday 14:00 - 15:00 <br>
Noticed that ionic uses slots in a similar way to Vue. Ion has css utility classes you can use.


## Create wireframes
Thursday 15:45 - 16:45 <br>

<img width="1472" height="993" alt="Screenshot 2025-10-16 at 16 43 49" src="https://github.com/user-attachments/assets/6e03d3d9-7b96-4acc-b92c-554d0fa1b95c" />

I was going back and forth about how to handle approving/denying a request. 
My ideas were either a detail page per request or a modal. I've settled on using a modal, there isn't a lot of 
information to display and this way the user doesn't have to navigate back and forth.
These are questions I would ask the product owner:  
* If a request is pending, can you cancel/edit it?
* How many items should be displayed in the list max?
* In what order should the pending list for the supervisor be displayed? 
* Should we add a search and/or filter to either list?
* Is there a max amount of characters for the notes?

### Identify components to built and components to use from ionic framework
Thursday 16:45 - 17:15 <br>
Looked at the component docs. The main components that are unique are the timeoff card with the form items in it. 
The request/pending list. The pagination.

## Storybook
Friday 10:30 - 10:45 <br>
Add configuration for ionic in storybook

## Routing and switching users
Friday 14:00-14:50 <br>
Learning about routing and the IonActionSheet to implement different views.
Added UserContext and dummy users.

## Components
Friday 15:00-16:00 <br>
Creating all three custom components and linking them to Storybook and creating a basic test. I've not tried to style them nicely yet.
I want to reuse my List for both the Supervisor and Employee views, but I am still thinking about which props/prop names to use to make it as readable as possible.
I want to work a little bit on the business logic and data type structure for requesting timeoff and for responding to the request, that should make my prop definition easier to create.

## Request business logic
Friday 16:00-16:45 <br>
* Implemented a mock API with localStorage persistence at src/api/timeoff.ts and hooks at src/hooks/useTimeOffRequests.ts.
* Wired EmployeePage to create requests via FormCard and list own requests. 
* Wired SupervisorPage to list team requests and approve/reject. 


## UI changes to make
Friday 16:45-17:30 <br>
I want to update the UI so it looks a bit better, the changes I want to make: <br>
[x] Change colors
[x] Replace header shadow with lighter shadow
[x] Change titles in navigation, Request, Response, Switch User
[x] Change icons in navigation
[x] Add empty list text to list component
[x] Add title to list
[x] Update form UI
[x] Remove text from header
[x] Add avatar to header


## Add components to pages
Saturday 9:15-10:15 <br>
Finished building the FormCard, the test and storybook, and added it to EmployeePage. 
Also added the unfinished Pagination and RequestList component to the EmployeePage to see how it all works together.
I ran into some issues writing the unit test, I wasn't able to select my items and the regular way of filling in a form inside the test didn't work.
With some help from ChatGPT I was able to fix the test.


## Deploy project to Vercel
Saturday 10:15-10:20 <br>
Added project to vercel, so I can check everything on my own phone.

## UI updates and Unit tests
Saturday 10:30-12:00 <br>
Worked on the unit tests some more. Found a better way to handle the buttons. Added Pagination unit test. Made some UI updates. 
Worked some more on the Pagination.
[x] Update list UI
[x] Remove request once approved or rejected and add it to history list for supervisor
[x] Move switching user to header


## Note to self
When checking vercel and downloading the app to the phone I noted there is a startup screen.
If I have time today I want to figure out how to change the image there.

## Pagination component
Saturday 13:15-14:00 <br>
Finished building the pagination including test and storybook.

## Readme
Saturday 14:00-14:10 <br>
Write readme page.

## Add cypress setup
Saturday 14:00-14:30 <br>
Started on the cypress configuration and some basic tests. 
Testing config is usually where I get stuck so I wanted to make sure I could make it work. 
Luckily the setup was really simple and the tests are running. Next step is to update the code so the tests are not failing.
I need to make the Supervisor response modal. I am also thinking that the pending requests should be an infinite scroll and 
not paginated, I saw that Ionic has something for that.

## Add loading states
Saturday 14:30-15:00 <br>
I've added mocked loading and spinners to the project to make it a bit more realistic even though the data is mocked.

## Style and make modal functional
Saturday 15:00-15:20 <br>
Styled the response modal and added components to SuperVisor page

## Finish e2e test
Saturday 16:00-17:15 <br>

## Add infinite scroll to supervisor request approval section
Saturday 17:15-17:30  <br>

## Move code to components
Saturday 17:15-17:45  <br>
The supervisor page was getting a bit bloated so I moved code to components.

## RequestList component
[x] Add some sort of visual to indicate current status of request


## Testing
[x] Check storybook 
[x] Make sure all the tests are passing








