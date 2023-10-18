using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.FileStrategy
{
    /// <summary>
    /// 上下文，通过这个来调用具体的策略
    /// </summary>
    public class FileContext
    {
        private Strategy _strategy;
        private List<IFormFile> _files;
        //通过注入的形式实现抽象类
        public FileContext(Strategy strategy, List<IFormFile> files)
        {
            _strategy = strategy;
            _files = files;
        }
        public async Task<string> ContextInterface()
        {
            return await _strategy.Upload(_files);  //这是个抽象方法，不知道调用谁的，应该是构造方法传入的那个
        }
    }
}
