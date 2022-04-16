export const api = 'https://wtbuer-server.miuss.icu'

export const showToast = function (message) {
  wx.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

export const showError = function (message) {
  wx.showToast({
    title: message.toString().replace(/Error/, "错误"),
    icon: 'none',
    duration: 2000
  })
}

const formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const formatTime = function (number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  var returnArr = []

  var date = new Date(number * 1000)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))

  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

export const formatThreadTime = function(e){
	var
	h=new Date(),
	d;
		
	if((e+'').match(/^[0-9]{10}$/)){
		d=new Date(e*1000);
	}else{
		var arr=e.split(/[-\/ :]/);
		d=new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	}
		
	var
	g=parseInt,
	f=g((h-d)/1000);
		
	return !e||f<0?'刚刚':
	f<60?(f+'秒前'):
	(f/=60)<60?g(f)+'分前':
	(f/=60)<24?g(f)+'时前':
	(f/=24)<7?g(f)+'天前':
	(f/=7)<2?g(f)+'周前':
	d>new Date(h.getFullYear()+'-01-01')?(d.getMonth()+1)+'月'+d.getDate()+'日':
	d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日';
};