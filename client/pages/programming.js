/**
 * Todo: Implement programming screen
 */


function TechStack(){
    const techstackContainer = document.createElement("div")
    techstackContainer.className = "techstack-container"

    const text = document.createElement("h4");
    text.innerText = "Technology Stack";
    text.className = "techstack-text"


    techstackContainer.appendChild(text)

    const listContainer = document.createElement("div");
    listContainer.className="techstack-list-container"

    const techList = ["React", "Angular", "Express", "JavaScript", "Python", "FastAPI"];
    const nodeList = techList.map((t) => {
        const techContainer = document.createElement("div");
        techContainer.className = "techContainer";

        const text = document.createElement("p")
        text.innerText = t

        techContainer.appendChild(text)

        return techContainer;
    })
    
    listContainer.append(...nodeList)

    techstackContainer.appendChild(listContainer)

    return techstackContainer

}

function Projects(){
    const projectContainer = document.createElement("div");
    projectContainer.className = "project-list-container";

    const projectHeader = document.createElement("h4");
    projectHeader.className = "project-header";
    projectHeader.innerText = "Projects"

    const projectItem = document.createElement("div");
    projectItem.className = "project-item";

    const projectItemHeader = document.createElement("h4");
    projectItemHeader.className = "project-item-header"
    projectItemHeader.innerText = "AI Task Manager"

    const projectItemDescription = document.createElement("p");
    projectItemDescription.className = "project-chips-container";
    projectItemDescription.innerText = "A smart task management system with AI-powered prioritization and scheduling recommendations.";
    
    const projectChipsContainer = document.createElement("div");
    projectChipsContainer.className = "project-chips-container"

    const projectTech = ["React", "TypeScript", "FastAPI", "PostgreSQl", "OpenAI"];
    projectTech.map((c) => {
        const chip = document.createElement("span");
        chip.className = "chip"
        
        const text = document.createTextNode(c)
        chip.appendChild(text)

        return chip;
    })
    projectChipsContainer.append(...projectTech)
    projectItem.append(projectItemHeader, projectItemDescription, projectChipsContainer)
    projectContainer.append(projectHeader, projectItem )
    
    return projectContainer
}

export default function Programming(){
    const container = document.createElement("div")
    const techStack = TechStack() 
    const projects = Projects()
    container.appendChild(techStack)
    container.appendChild(projects)
    return container
}