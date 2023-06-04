var cidade, chaveAPI;
function obterPrevisaoTempo() {
    cidade = document.getElementById('input-cidade').value;
    chaveAPI = '3b9735245c5f3f58daf6c4139a511c1e';
    document.querySelector(".titulo-app").innerHTML = `Previsão do tempo - ${cidade}`;
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chaveAPI}&units=metric`;
  
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        exibirPrevisaoTempo(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  function exibirPrevisaoTempo(previsao) {
    var previsaoHTML = '';
    var diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    
    var descricaoEmPortugues = {
        'clear sky': 'Céu limpo',
        'few clouds': 'Poucas nuvens',
        'scattered clouds': 'Nuvens dispersas',
        'broken clouds': 'Nuvens quebradas',
        'shower rain': 'Chuva',
        'rain': 'Chuva',
        'thunderstorm': 'Trovoadas',
        'snow': 'Neve',
        'mist': 'Nevoeiro',
        'light rain': 'chuva leve',
    }
    
    var dia = new Date(previsao.list[0].dt_txt.split(' ')[0]);
    
    for (var i = 0; i < previsao.list.length; i++) {
      
      if (i === 0 || new Date(previsao.list[i].dt_txt.split(' ')[0]) > dia) {

        var dataList = previsao.list[i].dt_txt.split(' ');
        var data = new Date(dataList)
        var dataHora = dataList[1];
        var diaSemana = diasSemana[data.getDay()];
        var temperatura = previsao.list[i].main.temp;
        var descricaoCodigo = previsao.list[i].weather[0].description;
        var descricao = descricaoEmPortugues[descricaoCodigo];

        
        previsaoHTML += '<tr><td>' + diaSemana + '</td><td>' + temperatura + ' °C</td><td>' + descricao + '</td></tr>';

        
        dia = new Date(dataList[0]);
      }
    }
    
    // Atualizar os elementos HTML com os dados da previsão do tempo
    document.getElementById('previsao').innerHTML = previsaoHTML;
    
  }
  
  
  // Atualizar a previsão do tempo a cada 1 hora
  setInterval(function() {
    obterPrevisaoTempo();
  }, 3600000);
  

