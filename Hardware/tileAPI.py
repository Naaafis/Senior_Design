import asyncio

from aiohttp import ClientSession

from pytile import async_login


async def main() -> None:
    """Run!"""
    async with ClientSession() as session:
        api = await async_login("nafis216@gmail.com", "ProfPissanoIsNo1", session, client_uuid="Fluffy", locale="en-GB")

        tiles = await api.async_get_tiles()

        for tile_uuid, tile in tiles.items():
            print(f"The Tile's name is {tile.name}")
            print(f"The Tile's Latitude is {tile.latitude}")
            print(f"The Tile's Longitude is {tile.longitude}")
            # ...


asyncio.run(main())