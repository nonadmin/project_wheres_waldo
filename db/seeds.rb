# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Character.destroy_all
CharacterLocation.destroy_all
Image.destroy_all
Tag.destroy_all
Game.destroy_all
Highscore.destroy_all

characters = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof']

characters.each do |c|
  Character.create!(name: c)
end

Image.create!(src: "ww_1.jpg")

image = Image.find_by_src('ww_1.jpg')

image.character_locations.create!(character: Character.find_by_name('Waldo'), 
                                  pos_x: 810,
                                  pos_y: 145)
image.character_locations.create!(character: Character.find_by_name('Wenda'), 
                                  pos_x: 305,
                                  pos_y: 106)
image.character_locations.create!(character: Character.find_by_name('Odlaw'), 
                                  pos_x: 350,
                                  pos_y: 582)
