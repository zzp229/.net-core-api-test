﻿using Microsoft.AspNetCore.Http;
using Qiniu.Http;
using Qiniu.Storage;
using Qiniu.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.FileStrategy
{
    public class QiNiuStrategy : Strategy
    {
        public override async Task<string> Upload(List<IFormFile> files)
        {
            var result = Task.Run(() =>
            {
                Mac mac = new Mac("nSIMlQQ2xFpkpberyik3zVhkWFe98xNAiISd5Tr1", "z8wQDOEwZ7zse4OntmUmdLGarnwy5-bO4q0eGAHS");
                List<string> res = new List<string>();
                foreach (var formFile in files)
                {
                    if (formFile.Length > 0)
                    {
                        //先载入本地再上传云端
                        var filePath_temp = $"{AppContext.BaseDirectory}/Images_temp";
                        var fileName = $"{DateTime.Now:yyyyMMddHHmmssffff}{formFile.FileName}";
                        if (!Directory.Exists(filePath_temp))
                        {
                            Directory.CreateDirectory(filePath_temp);
                        }
                        using (var stream = System.IO.File.Create($"{filePath_temp}/{fileName}"))
                        {
                            formFile.CopyTo(stream);
                        }
                        // 上传文件名
                        string key = fileName;
                        // 本地文件路径
                        string filePath = $"{filePath_temp}/{fileName}";
                        // 存储空间名
                        string Bucket = "pl-static";
                        // 设置上传策略
                        PutPolicy putPolicy = new PutPolicy();
                        // 设置要上传的目标空间
                        putPolicy.Scope = Bucket;
                        // 上传策略的过期时间(单位:秒)
                        //putPolicy.SetExpires(3600);
                        // 文件上传完毕后，在多少天后自动被删除
                        //putPolicy.DeleteAfterDays = 1;
                        // 生成上传token
                        string token = Auth.CreateUploadToken(mac, putPolicy.ToJsonString());
                        Config config = new Config();
                        // 设置上传区域
                        config.Zone = Zone.ZONE_CN_East;
                        // 设置 http 或者 https 上传
                        config.UseHttps = true;
                        config.UseCdnDomains = true;
                        config.ChunkSize = ChunkUnit.U512K;
                        // 表单上传
                        FormUploader target = new FormUploader(config);
                        HttpResult result = target.UploadFile(filePath, key, token, null);
                        res.Add(fileName);
                        //删除备份文件夹
                        Directory.Delete(filePath_temp, true);
                    }
                }
                return string.Join(",", res);
            });
            return await result;
        }
    }
}
