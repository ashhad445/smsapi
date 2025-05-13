const COUNT_EMP = "https://organic-bassoon-v6wjx7rg5rxv3w4pq-5001.app.github.dev/count_emp";
fetch(COUNT_EMP).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch Data");
    return response.json();
}).then(data=>{
    data.forEach(coun=>{
        document.getElementById("Employees").innerHTML = ` Total Employees  ${coun.count}`;
    });
}).catch(err=>{
    console.lock(err.message);
});

const COUNT_COUNTRY = "https://organic-bassoon-v6wjx7rg5rxv3w4pq-5001.app.github.dev/count_country";
fetch(COUNT_COUNTRY).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch Data");
    return response.json();
}).then(data=>{
   
    
    data.forEach(coun=>{
        document.getElementById("Countries").innerHTML = ` Total Countries  ${coun.count}`;
    });
}).catch(err=>{
    console.lock(err.message);
});

const COUNT_DEPARTMENTS = "https://organic-bassoon-v6wjx7rg5rxv3w4pq-5001.app.github.dev/count_departments";
fetch(COUNT_DEPARTMENTS).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch Data");
    return response.json();
}).then(data=>{
   
    
    data.forEach(coun=>{
        document.getElementById("Countries").innerHTML = ` Total Departments  ${coun.count}`;
    });
}).catch(err=>{
    console.lock(err.message);
});
