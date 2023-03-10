const admin = {
    "code": 0,
    "message": "获取权限成功",
    "data": [
        {
            "name": "订单管理",
            "children": [
                {
                    "name": "订单列表"
                },
                {
                    "name": "生产管理",
                },
                {
                    "name": "退货管理"
                }
            ]
        },
        {
            "name": "产品管理",
            "children": [
                {
                    "name": "产品列表"
                },
                {
                    "name": "产品分类"
                },
                {
                    "name": "产品存储"
                }
            ]
        }
    ]
}


const user = {
    "code": 0,
    "message": "获取权限成功",
    "data": [
        {
            "name": "订单管理",
            "children": [
                {
                    "name": "订单列表"
                },
                {
                    "name": "生产管理",
                },
                {
                    "name": "退货管理"
                }
            ]
        },
        {
            "name": "产品管理",
            "children": [
                {
                    "name": "产品列表"
                },
                {
                    "name": "产品分类"
                }
            ]
        }
    ]
}


module.exports = {
    admin,
    user
  };