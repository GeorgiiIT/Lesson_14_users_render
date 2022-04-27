const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};
const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "JackSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "AmalSmith",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "NoahSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "CharlieSmith",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "EmilySmith",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "LeoSmith",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
];
class User {
	constructor(obj){
		for(let key in obj){
			this[key] = obj[key];
		}
		
	}
	render(){
		return `
		<div class="user">
		<div class="user__info">
		<div class="user__info--data">
			 <img src="images/users/${this.img}.png" alt="${this.name}" height="50">
			 <div class="user__naming">
				  <p>Name: <b>${this.name}</b></p>
				  <p>Age: <b>${this.age}</b></p>
			 </div>
		</div>
		<div class="user__info--role ${this.role}">
			 <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
			 <p>${this.role}</p>
		</div>
		</div>
${this.courses ? this.renderCourses() : ``}
	</div>
		`};
renderCourses(){
	return ` 
		<div class="user__courses">
		${this.courses.map((course) =>
			`<p class="user__courses--course ${this.role}">
			${course.title}
			<span class="${this.getScore(course.mark)}">${this.getScore(course.mark)}</span>
			</p>`
			).join(``)
		}
		</div>`
}	
getScore(mark){
	if(mark >=0 && mark <=20){
	return  `satisfactory`;
} else if(mark >=20 && mark <=55){
	return `good`;
} else if(mark >=55 && mark <=85){
	return `very-good`
}
else if(mark >=85 && mark <=100){
	return `excellent`
}
}
};
class Student extends User{
	constructor(obj){
	super(obj);	
	}
}
class Lector extends User{
	constructor(obj){
	super(obj);
	}
	renderCourses(){
			return ` 
			<div class="user__courses admin--info">
			${this.courses.map((course) =>
				`<div class="user__courses--course lector">
				<p>Title:<b> ${course.title}</b></p>
				<p>Lector's score:
				<span class="${this.getScore(course.score)}">${this.getScore(course.score)}</span> </p>
				<p>Average student's score: <span class="${this.getScore(course.studentsScore)}">${this.getScore(course.studentsScore)}</span></p>
				</p>
				</div>
				`
				).join(``)
			}
			</div>`
	} 
}
class Admin extends User{
	constructor(obj){
	super(obj);
	}
	renderCourses(){
			return ` 
			<div class="user__courses admin--info">
			${this.courses.map((course) =>
				`<div class="user__courses--course admin">
				<p>Title:<b> ${course.title}</b></p>
				<p>Admin's score:<span class="${this.getScore(course.score)}">${this.getScore(course.score)}</span> </p>
				<p>Lector:<b>${course.lector}</b></p>
				</div>
				`
				).join(``)
			}
			</div>`	
	} 
}
let modifiedUsers = users
.map(user =>{
	switch(user.role){
		case `student`:
			return new Student(user);
		case `admin`:
			return new Admin(user);
		case `lector`:
			return new Lector(user);
	}
})	
let renderList = (arr) => {
	return `<div class="users"> ${arr.map(item => {
		 return `<div class="user">${item.render()}</div>`
	}).join('')} </div> `
	}
renderList(modifiedUsers);
document.write(`<div class="user__info">${renderList(modifiedUsers)}</div>`)
