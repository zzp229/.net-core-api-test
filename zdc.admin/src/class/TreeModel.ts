export default interface TreeModel {
    //菜单路由地址
    Index:string  
    //菜单名称
    Name: string 
    //子集 
    // Children:TreeModel[]
    Children: Array<TreeModel>
    //文件路径（动态路由）使用Vite动态路由，而不是webpack
    FilePath: string
}