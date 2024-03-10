

# Scaffold command
Scaffold-DbContext -Connection "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=SpacePhotos" -Provider Microsoft.EntityFrameworkCore.SqlServer -OutputDir "Entities" -ContextDir "./" -Context "AppDbContext" -Schemas "dbo" -Force -NoOnConfiguring -Project "SpacePhotos.EF" -Namespace "SpacePhotos.EF.Entities" -ContextNamespace "SpacePhotos.EF" 
        