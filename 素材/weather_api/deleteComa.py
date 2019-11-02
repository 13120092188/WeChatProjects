#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
os.chdir(sys.path[0])

with open("city.json","r",encoding="utf-8") as fr:
    with open("cityFinal.json","w",encoding="utf-8") as fw:
        str = fr.read(1)
        print("数据处理中...")
        while str:
            fw.write(str)
            if(str == "}"):
                str = fr.read(1)
            str = fr.read(1)
    fw.close()
fr.close()
print("处理完成！！！")