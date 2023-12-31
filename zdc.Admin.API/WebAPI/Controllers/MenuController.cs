﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interface;
using Microsoft.AspNetCore.Mvc;
using Model.Dto.Menu;
using Model.Other;
using WebAPI.Config;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    public class MenuController : BaseController
    {
        private readonly IMenuService _Menu;
        public MenuController(IMenuService Menu)
        {
            _Menu = Menu;
        }
        [HttpPost]
        public async Task<ApiResult> Add(MenuAdd req)
        {
            userId = HttpContext.User.Claims.ToList()[0].Value;
            return ResultHelper.Success(await _Menu.Add(req, userId));
        }
        [HttpPost]
        public async Task<ApiResult> Edit(MenuEdit req)
        {
            userId = HttpContext.User.Claims.ToList()[0].Value;
            return ResultHelper.Success(await _Menu.Edit(req, userId));
        }
        [HttpGet]
        public async Task<ApiResult> Del(string id)
        {
            return ResultHelper.Success(await _Menu.Del(id));
        }
        [HttpGet]
        public async Task<ApiResult> BatchDel(string ids)
        {
            return ResultHelper.Success(await _Menu.BatchDel(ids));
        }
        [HttpPost]
        public async Task<ApiResult> GetMenus(MenuReq req)
        {
            userId = HttpContext.User.Claims.ToList()[0].Value;
            return ResultHelper.Success(await _Menu.GetMenus(req, userId));
        }
        [HttpGet]
        public async Task<ApiResult> SettingMenu(string rid, string mids)
        {
            return ResultHelper.Success(await _Menu.SettingMenu(rid, mids));
        }
    }
}

