Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'localhost:3002' #ここにうんたら.comみたいな許可したいオリジンを指定する
    resource '*', :headers => :any, :methods => [:get, :post, :options], :expose => ['access-token']
  end
end