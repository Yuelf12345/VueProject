function getData(num){
    const data = []
    for(let i=1;i<=num;i++){
        const obj = {};
        obj.id = i;
        obj.FO_Num = 'TY2023031'+i;
        obj.O_Num = '2023031'+i;
        obj.O_Status = i % 2 == 0 ? '未开始' : '进行中';
        obj.P_Progress = Math.floor(Math.random() * (60 - 20 + 1)) + 20 // 20 - 60 随机数
        obj.C_Emission = Math.floor(Math.random() * (120 - 60 + 1)) + 60 // 60 - 100 随机数
        obj.C_Open = i % 2 == 0 ? true : false;
        obj.S_Avatar = i % 2 == 0 ? 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' : 'https://img.soogif.com/1CMjb5x0EATQArD0vGJ1TionelKfOQ2r.gif';
        data.push(obj)
    }
    return data
}


export default getData