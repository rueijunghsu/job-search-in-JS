const urlAll = 'https://job-list-9527.herokuapp.com/api/v1/jobs/job_info'
const container = document.querySelector('.container')

async function fetchJobs() {
  const response = await fetch(urlAll)
  const jsonResponse = await response.json()
  return jsonResponse.data
}

function renderView(jobs, pageCount, nowPage) {
  createBaseElement(nowPage, pageCount)
  createJobTbody(jobs)
}

async function firstLoaded() {
  const jobInfos = await fetchJobs()
  const allPageCount = Math.ceil(jobInfos.length / 10)
  renderView(jobInfos, allPageCount, 1)
}

//*=======
// 進入口
//=======*
window.addEventListener('DOMContentLoaded', function () {
  firstLoaded()
})

function createBaseElement(nowPage, pageCount) {
  const prePage = nowPage - 1
  const nextPage = nowPage + 1
  const container = document.querySelector('.container')
  container.innerHTML = `
  <div class="css-table">
    <div class="css-thead">
      <div class="css-htr">
        <div class="css-th">日期</div>
        <div class="css-th">職位名稱</div>
        <div class="css-th">薪資</div>
        <div class="css-th">公司名稱</div>
        <div class="css-th">公司地址</div>
      </div>
    </div>
    <div class="css-t-body">
    </div>
  </div>
  <div class="pagination">
    <span class="backpage hidden" data-page="${prePage}" data-type="pagination">上一頁</span>
    <span class="nextpage" data-page="${nextPage}" data-type="pagination">下一頁</span>
    <span class="page-counter"> ${nowPage}/${pageCount} 頁<span> 
  </div>
  `
}

// function createJobTbody(jobs) {
//   const infoBlock = document.querySelector('.css-t-body')
//   let result = ''
//     jobs.forEach((job) => {
//       result = result + `
//       <a class="css-tr" href='http://${job.link}'>
//         <div class="css-td">${job.date}</div>
//         <div class="css-td">${job.name}</div>
//         <div class="css-td">${job.salary}</div>
//         <div class="css-td">${job.company_name}</div>
//         <div class="css-td">${job.address}</div>
//       </a>
//       `
//     });
//   infoBlock.innerHTML = result
// }

function createJobTbody(searchJobs) {
  searchJobs.forEach((job) => {
    createTbodyElement(job)
  })
}

function createTbodyElement(jobInfo) {
  const infoBlock = document.querySelector('.css-t-body')
  let newJobTr = document.createElement('a')
  newJobTr.className = "css-tr"
  let jobAtributes = [jobInfo.date, jobInfo.name, jobInfo.salary, jobInfo.company_name, jobInfo.address]
  newJobTr.href = `http://${jobInfo.link}`
  createTrElement(jobAtributes, newJobTr)
  infoBlock.appendChild(newJobTr) //組合成 t-body
}

function createTrElement(attributeItems, elementTr) {
  attributeItems.forEach((atr) => {
    let jobTd = document.createElement('div') // 建立 td
    jobTd.className = "css-td"
    jobTd.textContent = atr
    elementTr.appendChild(jobTd) // 組合成 tr
  })
}