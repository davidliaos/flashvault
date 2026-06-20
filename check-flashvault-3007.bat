@echo off
netstat -ano | findstr :3007
if exist C:\Users\ray41\Projects\flashvault\.next\dev\flashvault.log type C:\Users\ray41\Projects\flashvault\.next\dev\flashvault.log
