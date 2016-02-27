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

characters = ['Waldo', 'Wenda', 'Odlaw', 'Wizard Whitebeard', 'Woof']

characters.each do |c|
  Character.create!(name: c)
end

Image.create!(src: "ww_1.jpg")

image = Image.find_by_src('ww_1.jpg')

image.character_locations.create!(character: Character.find_by_name('Waldo'), 
                                  pos_x: 754,
                                  pos_y: 84)
image.character_locations.create!(character: Character.find_by_name('Wenda'), 
                                  pos_x: 250,
                                  pos_y: 43)
image.character_locations.create!(character: Character.find_by_name('Odlaw'), 
                                  pos_x: 284,
                                  pos_y: 526)
