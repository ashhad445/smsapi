const JOB_API_LINK = "https://organic-bassoon-v6wjx7rg5rxv3w4pq-5001.app.github.dev/jobs";
fetch(JOB_API_LINK).then(response=>{
    if(!response.ok)
        throw new Error("Failed to fetch Data");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#jobtable tbody");
    data.forEach(job=>{
        const row = document.createElement("tr");
        row.innerHTML=`
        <td>${job.job_id}</td>
        <td>${job.job_title}</td>
        <td>${job.min_salary}</td>
        <td>${job.max_salary}</td>
        `;
        tbody.appendChild(row);
    });
}).catch(err=>{
    console.lock(err.message);
});