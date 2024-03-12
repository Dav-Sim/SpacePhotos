# Space photos
Hobby projekt kter� zobrazuje data z�skan� z NASA API.

## Technologie
- ASP.NET
- MS SQL
- React (Vite, Typescript)
- Entity framework

## Popis
Backend komunikuje s NASA API, a v�sledky cachuje v datab�zi pro urychlen� a omezen� po�tu po�adavk� na ciz� API.
Projekt nepou��v� EF migrace, ale SSDT projket s mo�nost� publikovat p�es profily.
Frontend je napsan� v Reactu (Vite) a pou��v� nap�. react-query.
Frontend a backend je rozd�len do samostatn�ch projekt� csproj a esproj co� umo��uje aktu�ln� VisualStudio 2022.

## Seznam projekt� v solution
- Api (backend)
- Database (SQL "SSDT" projekt)
- EF (v projektu jsou entity a dbcontext)
- Frontend (React frontend)

## Spu�t�n� projektu
- Pro spu�t�n� je pot�eba zalo�it datab�zi a publikovat SpacePhotos.Database projekt p�es publish profil v "Database" projektu.
- D�le je pot�eba zm�nit connection string v appsettings.Development.json na tuto datab�zi.

Te� je mo�n� projekt spustit z Visual Studia a to bu� cel� (backend i frontend) najednou. 
Nebo spustit jen backend a frontend si spustit ve VS code pomoc� "npm run start"

To z�le�� na nastaven� startup projektu:
Oboje
![spustit oba projekty](start.jpg)

Pouze backend
![spustit jen api](start_api.jpg)

## publish
publikov�n� projektu jde standardn� p�es publish profil ve Visual Studiu