@echo off


:LOOP
start msedge  "C:\Users\bruno\Desktop\Proyectos\Propios\Cod Api1\Save\index.html"
echo Podemos proseguir? 
choice /c yn /n /m  "(y/n)"
if errorlevel 2 (
    cls
    echo Ok
    goto :LOOP
) else (
    node "C:\Users\bruno\Desktop\Proyectos\Propios\Cod Api1\Update\update.js"
    goto :ENDLOOP
)

:ENDLOOP

