FactoryBot.define do
  factory :post do
    name { 'test' }
    content { 'example' }
    public { false }
  end
end
