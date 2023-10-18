using Interface;
using Microsoft.AspNetCore.Http;
using Model.Enum;
using Service.FileStrategy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class FileService : IFileService
    {
        public async Task<string> Upload(List<IFormFile> files, UploadMode mode)
        {
            FileContext fileContext = new FileContext(FileFactory.CreateStrategy(mode), files);    //工厂会根据mode创建对象
            return await fileContext.ContextInterface();    //给FileContext上传
        }
    }
}
