export { createProjectSection, getReposArray }

//const projectContainer = document.querySelector('.projects__container--js');

async function getRepositoriesFromGithub(){
    
    const r = await fetch("https://api.github.com/users/raviraven/repos")
    //.then((response) => response.json())
    // .then((response) => {
    //     for(const repo of response) {
    //         // if(repo.description != null) {
    //         if(true){
    //             const {name, description, homepage, html_url} = repo;
    //             let object = {
    //                 'name': name,
    //                 'description': description,
    //                 'homepage': homepage,
    //                 'html_url': html_url 
    //             };
    //             reposArray.push("dupa");
    //             //createProjectContainer(createProjectSection(name, description, homepage, html_url));
    //         }
    //     }
    // })
    .catch((error) =>{
        console.log(error);
    })
    //console.log(await r.json());
    return r.json();
}

async function getReposArray(){
    let reposJSON = await getRepositoriesFromGithub();

    let reposArray=[];
    for(const repo of reposJSON){
        // if(repo.description != null){
        if(true){
            const {name, description, homepage, html_url} = repo;
            let object = {
                'name': name,
                'description': description,
                'homepage': homepage,
                'html_url': html_url 
            };
            reposArray.push(object);
        }
    }
    return reposArray;
}

function createHyperlink(url, urlDesc){
    let htmlElem = `<span class="project__text--url">N/a</span>`;
    if(url != null)
    {
        htmlElem = `&lt;<a href="${url}" title="" class="project__text--url" target="_blank" rel="noopener noreferrer">${urlDesc}</a>&gt;`
    }
    return htmlElem;
}

function createProjectSection(name, description, demo_url, github_url){
    let demoDesc = `see here`;
    let githubDesc = `source code`;
    
    let project_section = `
    <section class="project">
    <header class="project__header">
    <span class="project__header--circle"></span>
    <span class="project__header--circle"></span>
    <span class="project__header--circle"></span>
    </header>
    
    <div class="project__content">
    <div>
    <span class="project__github">
    <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <path
    class="project__github--svgicon"
    d="M12.0013 1.00403e-06C5.37057 -0.00268026 0 5.36521 0 11.9906C0 17.2298 3.35962 21.6834 8.03843 23.319C8.66853 23.4772 8.572 23.0294 8.572 22.7237V20.6457C4.93353 21.0721 4.78606 18.6643 4.54206 18.2621C4.04871 17.4202 2.88236 17.2057 3.23092 16.8035C4.05943 16.3772 4.90403 16.9107 5.88269 18.3559C6.59055 19.4043 7.9714 19.2274 8.67121 19.0531C8.82404 18.423 9.15116 17.8599 9.60161 17.4229C5.83175 16.7472 4.26053 14.4467 4.26053 11.7118C4.26053 10.3845 4.69758 9.16457 5.55558 8.18054C5.0086 6.55838 5.60652 5.16948 5.68696 4.96302C7.24478 4.8236 8.86426 6.07843 8.99028 6.17764C9.8751 5.939 10.8859 5.81298 12.0174 5.81298C13.1543 5.81298 14.1678 5.94437 15.0607 6.18568C15.3636 5.95509 16.8652 4.87722 18.313 5.0086C18.3908 5.21506 18.9753 6.57178 18.4605 8.1725C19.3292 9.1592 19.7716 10.3899 19.7716 11.7198C19.7716 14.4601 18.1897 16.7633 14.4091 17.4282C14.7329 17.7467 14.99 18.1265 15.1654 18.5454C15.3408 18.9643 15.431 19.414 15.4307 19.8682V22.8846C15.4521 23.1259 15.4307 23.3645 15.8329 23.3645C20.5814 21.7638 24 17.2781 24 11.9933C24 5.36521 18.6267 1.00403e-06 12.0013 1.00403e-06Z"
    fill="#4DA8FF"
    />
    </svg>
    </span>
    </div>
    
    <section class="project__text">
    <p class="project__text--key">project:</p>
    <p class="project__text--value project__text--value--name"><b>${name}</b></p>
    <p class="project__text--key">description:</p>
    <p class="project__text--value">
    ${description}
    </p>
    <p class="project__text--key">demo:</p>
    <p class="project__text--value">
    ${createHyperlink(demo_url, demoDesc)}
    </p>
    <p class="project__text--key">github:</p>
    <p class="project__text--value">
    ${createHyperlink(github_url, githubDesc)}
    </p>
    </section>
    </div>
    
    </section>
    `;
    return project_section;
}