using SpacePhotos.EF;

namespace SpacePhotos.Tests;

internal class TestDatabaseSeeder
{
    private readonly AppDbContext _context;

    public TestDatabaseSeeder(AppDbContext context)
    {
        _context = context;
    }

    public void Seed()
    {
        _context.Database.EnsureDeleted();
        _context.Database.EnsureCreated();

        //TODO test data here

        _context.ChangeTracker.Clear();
    }
}