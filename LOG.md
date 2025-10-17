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
[ ] Add card component and link to storybook <br>
[ ] Write unit test for card component <br>
[ ] Add pagination component and link to storybook <br>
[ ] Add pagination unit test <br>
[x] Add navigation <br>
[x] Add user switch toggle <br>
[ ] Add components to pages <br>
[ ] Update theme <br>
[ ] Add integration tests <br>
[ ] Write readme


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
    id: 1
    name: Emma,
    supervisorId: 3
    employeesToSupervise: [] 
}

person2 =  {
    id: 2
    name: Bob,
    supervisorId: 3
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

## Write unit test for card component 
Things I should test:
*  enter a start date and validate that it's not in the past
*  enter an end date and validate that it's not before the start date
*  having a select with these values: vacation/sick-day/personal
*  being able to select a value
*  validate that the form cannot be submitted without filling in the mandatory fields or if there are errors
*  validate that the form can be submitted if the mandatory fields are filled in and there are no errors
*  being able to type in the note field

## Storybook
Friday 10:30 - 10:45 <br>
Add configuration for ionic in storybook

## Routing and switching users
14:00-14:50 <br>
Learning about routing and the IonActionSheet to implement different views.
Added UserContext and dummy users.



