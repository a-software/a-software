function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomA(min, max) {
  return Math.random() * (max - min) + min;
}

function toNumber(value) {
	value = Number(value).toFixed(2)
	return parseFloat(value)
}

const defaultStore = {
	userHouses: {
	},
	otherHouses: {
		"5": getRandomA(1, 4),
		"8": getRandomA(1, 4)
	},
	coins: 0,
	players: Math.round(getRandomA(5, 12)),
	seconds: 0,
	message: ""
}

const houses = 25;
const NumberContext = React.createContext(defaultStore);

const ActionBlock = styled(({ className, changeOtherStore, houseId, coins, price, changeStore, houseCoins }) => {
  const [value, setValue] = React.useState(coins);
  React.useEffect(() => {
	  setValue(coins)
  }, [coins]);
  const handleClick = () => {
	  changeStore(houseId, value);
  }
  const handleWithdraw = () => {
	  changeStore(houseId, houseCoins*-1);
  }
  const handleChange = (event) => {
	  setValue(event.target.value)
  }
  const handleStealing = (event) => {
	  changeOtherStore(houseId)
  }
  return (
    <div className={className}>
	  {(!houseCoins && coins > price) ? <div className="item">
			<button onClick={handleStealing}>Обокрасть за {toNumber(price)} тупокоинов</button>
		  </div>: null}
	  {houseCoins ? <div className="item">
		<button onClick={handleWithdraw}>Вывести {toNumber(houseCoins)} тупокоинов</button>
      </div> : null}
	  {coins ? <div className="item">
      <input type="range" min="0.01" max={coins} step="0.01" value={value} onChange={handleChange} />
      <button onClick={handleClick}>Занести {toNumber(value)} тупокоинов</button>
      </div> : null}
    </div>
  );
})`
  width: 0;
  height: 0;
  visibility: hidden;
  position: relative;
  top: 7px;
  z-index: 100;
  left: -30px;
  opacity: 0;
  font-size: 10px;
  transition:
    visibility 0s,
    opacity 0.2s linear;
  background-color: #555;
  border-radius: 5px;
  padding: 0;
  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 40px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #555 transparent;
  }
  &:hover {
    cursor: pointer;
  }
  * {
    cursor: pointer;
    backgroung-color: #fefefe;
  }
  .item {
    padding: 5px 0;
  }
  .item * {
    margin-right: 5px;
    display: inline;
    vertical-align: middle;
  }
`;

const Message = styled(({message, className}) => {
	var render = true;
	setTimeout(() => {
		render = false;
	}, 4000)

	return ((render && message) ? <div className={className}>{message}</div> : null)
})`
 background-color: yellow;
 position: absolute;
 left: 40%;
 top: 20px;
 padding: 20px;
 font-size: 14px;
`;

const House = styled(({ className, houseId, fill, size}) => {
  let [store, setStore] = React.useContext(NumberContext);
 
	let totalCoins = 0;
	    for (const [key, value] of Object.entries(store.userHouses)) {
		    totalCoins = value + totalCoins
	    }
	    for (const [key, value] of Object.entries(store.otherHouses)) {
		    totalCoins = value + totalCoins
	    }
  const changeStore  = (key, value) => {
	  setStore({
		  ...store,
		  "userHouses": {
			  ...store.userHouses,
			  [key]: (store.userHouses[key] || 0) + Number(value)
		  },
		  coins:  store.coins-Number(value)
	  })
  }
  const changeOtherStore  = (key, value) => {
	  var other = 0;
	  let message = "";
	  if (store.otherHouses[key]) {
		  other = store.otherHouses[key]
		  console.log("you won", other);
		  message = `Ты выкрал ${toNumber(other)} тупокоинов`;
	  }
	  setStore({
		  ...store,
		  "otherHouses": {
			  ...store.otherHouses,
			  [key]: 0
		  },
		  message: message,
		  coins:  store.coins-Number(totalCoins/houses) + other
	  })
  }
  return (
    <div className={className}>
      {store.userHouses[houseId] ? <div className="text">{toNumber(store.userHouses[houseId])}</div> : null}
      <svg
        fill={fill}
        height={size}
        width={size}
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 486.196 486.196"
      >
        <g>
          <path
            d="M481.708,220.456l-228.8-204.6c-0.4-0.4-0.8-0.7-1.3-1c-5-4.8-13-5-18.3-0.3l-228.8,204.6c-5.6,5-6,13.5-1.1,19.1
		c2.7,3,6.4,4.5,10.1,4.5c3.2,0,6.4-1.1,9-3.4l41.2-36.9v7.2v106.8v124.6c0,18.7,15.2,34,34,34c0.3,0,0.5,0,0.8,0s0.5,0,0.8,0h70.6
		c17.6,0,31.9-14.3,31.9-31.9v-121.3c0-2.7,2.2-4.9,4.9-4.9h72.9c2.7,0,4.9,2.2,4.9,4.9v121.3c0,17.6,14.3,31.9,31.9,31.9h72.2
		c19,0,34-18.7,34-42.6v-111.2v-34v-83.5l41.2,36.9c2.6,2.3,5.8,3.4,9,3.4c3.7,0,7.4-1.5,10.1-4.5
		C487.708,233.956,487.208,225.456,481.708,220.456z M395.508,287.156v34v111.1c0,9.7-4.8,15.6-7,15.6h-72.2c-2.7,0-4.9-2.2-4.9-4.9
		v-121.1c0-17.6-14.3-31.9-31.9-31.9h-72.9c-17.6,0-31.9,14.3-31.9,31.9v121.3c0,2.7-2.2,4.9-4.9,4.9h-70.6c-0.3,0-0.5,0-0.8,0
		s-0.5,0-0.8,0c-3.8,0-7-3.1-7-7v-124.7v-106.8v-31.3l151.8-135.6l153.1,136.9L395.508,287.156L395.508,287.156z"
          />
        </g>
      </svg>
     {(store.coins > 0 || store.userHouses[houseId]) ? <ActionBlock
	      houseId={houseId} 
	     price={totalCoins/houses}
	     changeStore={changeStore} changeOtherStore={changeOtherStore} coins={store.coins} houseCoins={store.userHouses[houseId]} /> : null}
    </div>
  );
})`
  position: absolute;
  left: ${(props) => props.left}%;
  top: ${(props) => props.top}%;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }
  &:hover ${ActionBlock} {
    height: auto;
    width: auto;
    visibility: visible;
    opacity: 1;
    padding: 17px;
  }
  .text {
	font-size: 14px;
	position: absolute;
	top: 0;
	left: ${(props) => props.size};
	margin-left: 10px;
  }
`;

const HousesContainer = React.memo(styled(({ className }) => {
  let array = Array.from(Array(houses).keys());

  return (
    <div className={className}>
      {array.map((a) => {
        let fill = getRandomColor();
        let size = getRandomA(15, 30) + "px";
        return (
          <House
            key={a}
            fill={fill}
            size={size}
            houseId={a.toString()}
            left={getRandomA(0, 100)}
            top={getRandomA(0, 100)}
          />
        );
      })}
    </div>
  );
})`
  width: 100%;
  height: 90%;
  color: green;
  position: absolute;
  bottom: 0;
`);

const Safe = styled(({className, coins, makeCoins}) => {
	return (<div className={className}>
		<svg xmlns="http://www.w3.org/2000/svg"
	          viewBox="0 0 1024 1024"
		  height="30px"
		  width="30px"
		  fill="gray"
		>
			<path d="M769.17857956 772.8394846H299.6675073c-32.94814542 0-60.40493329-27.45678784-60.40493329-60.40493328V242.92347905c0-32.94814542 27.45678784-60.40493329 60.40493329-60.40493327h469.51107226c32.94814542 0 60.40493329 27.45678784 60.40493325 60.40493327v469.51107227c0 32.94814542-26.54156159 60.40493329-60.40493325 60.40493328zM299.6675073 218.21236998c-13.72839391 0-24.71110907 10.98271516-24.71110906 24.71110907v469.51107227c0 13.72839391 10.98271516 24.71110907 24.71110906 24.71110905h469.51107226c13.72839391 0 24.71110907-10.98271516 24.71110906-24.71110905V242.92347905c0-13.72839391-10.98271516-24.71110907-24.71110906-24.71110907H299.6675073z"  />
			<path d="M534.88065653 641.04690289c-90.60739991 0-164.74072711-74.1333272-164.7407271-164.74072709s74.1333272-164.74072711 164.7407271-164.74072712 164.74072711 74.1333272 164.74072712 164.74072712-73.21810095 164.74072711-164.74072712 164.74072709z m0-294.70285627c-71.38764842 0-129.04690289 57.6592545-129.0469029 129.04690292s57.6592545 129.04690289 129.0469029 129.0469029 129.04690289-57.6592545 129.04690293-129.0469029-57.6592545-129.04690289-129.04690293-129.04690292z"  />
			<path d="M682.23208468 579.72674338c-2.74567878 0-6.40658382-0.91522626-9.15226261-2.74567879l-147.35142816-86.03126861c-5.49135757-2.74567878-9.15226261-9.15226261-9.15226261-15.55884644V306.98931737c0-10.06748889 8.23703635-17.38929897 17.38929897-17.38929896 10.06748889 0 17.38929897 8.23703635 17.38929897 17.38929896v158.33414329l138.19916553 80.539911c8.23703635 4.5761313 10.98271516 15.55884645 6.40658383 24.7111091-1.83045253 6.40658382-7.3218101 9.15226261-13.72839392 9.15226262z"  />
			<path d="M388.44445468 579.72674338c-6.40658382 0-11.8979414-2.74567878-15.55884645-9.15226262-4.5761313-8.23703635-1.83045253-19.21975149 6.40658383-24.7111091l147.35142811-86.03126859c8.23703635-4.5761313 19.21975149-1.83045253 24.71110907 6.40658385 4.5761313 8.23703635 1.83045253 19.21975149-6.40658382 24.71110906l-147.35142814 86.03126861c-3.66090506 1.83045253-6.40658382 2.74567878-9.1522626 2.74567879z"  />
			<path d="M864.36211077 868.93824208h-658.96290844c-34.77859794 0-62.2353858-28.37201411-62.23538579-62.23538582v-658.96290843c0-34.77859794 28.37201411-62.2353858 62.23538579-62.23538579h658.96290844c34.77859794 0 62.2353858 28.37201411 62.2353858 62.23538579v658.96290843c0 34.77859794-28.37201411 62.2353858-62.2353858 62.23538582z m-658.96290844-747.73985584c-14.64362017 0-26.54156159 11.8979414-26.5415616 26.54156159v658.96290843c0 14.64362017 11.8979414 26.54156159 26.5415616 26.5415616h658.96290844c14.64362017 0 26.54156159-11.8979414 26.54156157-26.5415616v-658.96290843c0-14.64362017-11.8979414-26.54156159-26.54156157-26.54156159h-658.96290844z"  />
			<path d="M387.52922842 938.49543796H252.07574167c-10.06748889 0-17.38929897-8.23703635-17.38929897-17.38929898v-67.72674336c0-10.06748889 8.23703635-17.38929897 17.38929897-17.38929899h136.36871301c10.06748889 0 17.38929897 8.23703635 17.38929895 17.38929899v67.72674336c0 9.15226261-8.23703635 17.38929897-18.30452521 17.38929898z m-118.06418777-35.6938242h100.67488878v-32.03291917h-100.67488878v32.03291917zM818.60079767 938.49543796h-136.36871299c-10.06748889 0-17.38929897-8.23703635-17.38929896-17.38929898v-67.72674336c0-10.06748889 8.23703635-17.38929897 17.38929896-17.38929899h136.36871299c10.06748889 0 17.38929897 8.23703635 17.38929896 17.38929899v67.72674336c0.91522626 9.15226261-7.3218101 17.38929897-17.38929896 17.38929898z m-118.06418774-35.6938242h100.67488876v-32.03291917h-100.67488876v32.03291917z"  />
			<path d="M864.36211077 868.93824208h-658.96290844c-34.77859794 0-62.2353858-28.37201411-62.23538579-62.23538582v-658.96290843c0-34.77859794 28.37201411-62.2353858 62.23538579-62.23538579h658.96290844c34.77859794 0 62.2353858 28.37201411 62.2353858 62.23538579v658.96290843c0 34.77859794-28.37201411 62.2353858-62.2353858 62.23538582z m-658.96290844-747.73985584c-14.64362017 0-26.54156159 11.8979414-26.5415616 26.54156159v658.96290843c0 14.64362017 11.8979414 26.54156159 26.5415616 26.5415616h658.96290844c14.64362017 0 26.54156159-11.8979414 26.54156157-26.5415616v-658.96290843c0-14.64362017-11.8979414-26.54156159-26.54156157-26.54156159h-658.96290844zM115.70702868 348.17449915c-10.06748889 0-17.38929897-8.23703635-17.38929896-17.38929897V217.29714374c0-10.06748889 8.23703635-17.38929897 17.38929896-17.38929898 10.06748889 0 17.38929897 8.23703635 17.38929898 17.38929898v113.48805644c0 9.15226261-7.3218101 17.38929897-17.38929898 17.38929897zM115.70702868 756.36541187c-10.06748889 0-17.38929897-8.23703635-17.38929896-17.38929898v-113.48805644c0-10.06748889 8.23703635-17.38929897 17.38929896-17.38929897 10.06748889 0 17.38929897 8.23703635 17.38929898 17.38929897v113.48805644c0 10.06748889-7.3218101 17.38929897-17.38929898 17.38929898z"  />
			<path d="M534.88065653 531.21975149c-30.20246662 0-54.91357571-24.71110907-54.91357569-54.91357569s24.71110907-54.91357571 54.91357569-54.91357571 54.91357571 24.71110907 54.91357573 54.91357571c0.91522626 30.20246662-23.79588279 54.91357571-54.91357573 54.91357569z m0-75.04855347c-10.98271516 0-19.21975149 9.15226261-19.21975147 20.13497778s9.15226261 20.13497775 19.21975147 20.13497775c10.98271516 0 20.13497775-9.15226261 20.13497776-20.13497775s-9.15226261-20.13497775-20.13497776-20.13497778z"  />
		</svg>
		<div>{toNumber(coins)}</div>
		<button onClick={makeCoins}>Купить тупокоин</button>
	</div>)
})`
display: flex;
div {
 margin-left: 5px;
 margin-right: 30px;
}
`

const InfoBlock = styled(({className, store}) => {
	let stake = store.players * 0.00025
	let totalCoins = 0;
	    for (const [key, value] of Object.entries(store.userHouses)) {
		    totalCoins = value + totalCoins
	    }
	    for (const [key, value] of Object.entries(store.otherHouses)) {
		    totalCoins = value + totalCoins
	    }
	return (<div className={className}>
	    Всего тупокоинов в домиках: {toNumber(totalCoins)}	
		<br/>
	    Игроков: {store.players}	
		<br/>
	    Процент прироста: {toNumber(stake * 100)}%
		<br/>
	    Цена обкрадывания: {toNumber(totalCoins/houses)} тупокоинов
	</div>)
})`
 position: absolute;
 top: 20px;
 right: 20px;
 width: 250px;
 color: white;
 padding: 20px;
 font-size: 13px;
 background-color: #555555bd;
`

const StealingLoop = ({players, setStore}) => {

  React.useEffect(() => {
    const interval = setInterval(() => {
	    changeStore()
    }, 10000/players);

    return () => clearInterval(interval);
  }, [players]);
  
  

	return (<div></div>)
}


const MainLoop = ({ children }) => {
  const [store, setStore] = React.useState(defaultStore);
 
  const changeStoreSec = (a) => {
	  let stake = a.players * 0.00025
	    s = {}
	    for (const [key, value] of Object.entries(store.userHouses)) {
		    s[key] = value * (1 + stake)
	    }
	    r = {}
	    for (const [key, value] of Object.entries(store.otherHouses)) {
		    r[key] = value * (1 + stake)
	    }
	    return {
		    ...a,
		    seconds: a.seconds + 1,
		    userHouses:s,
		    otherHouses:r

	    }
  }
  
  const changeStorePlayers = (a) => {
	    return {
		    ...a,
		    players: Math.min(32, Math.max(5, a.players + Math.round(getRandomA(-2, 2))))

	    }
  }

  const changeStoreStealing = (a) => {
     let houseId = Math.round(getRandomA(0, houses)).toString();
     let houseIn = Math.round(getRandomA(0, houses)).toString();

     let message = "";
     if (a.userHouses[houseId]) {
	message = `У тебя выкрали ${toNumber(a.userHouses[houseId])} тупокоинов`;
	console.log("you lost", a.userHouses[houseId]);
     }

     return {
		    ...a,
		  userHouses: {
			  ...a.userHouses,
			  [houseId]: 0,
		}
		 ,otherHouses: {
			  ...a.otherHouses,
			  [houseId]: 0,
			 [houseIn]: Math.random() > 0.5 ? getRandomA(1, 4): 0
		},
		message: message 
	}
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
	    setStore(changeStoreSec)
	    if (store.seconds % 5 == 0) {
		setStore(changeStorePlayers) }
	    if (store.seconds % Math.round(50 / store.players) == 0) {
		setStore(changeStoreStealing)
	    }
    }, 1000);

    return () => clearInterval(interval);
  });


  const makeCoins = () => {
     setStore({
	     ...store,
	     coins: store.coins + 1
     });
  }
  
  return (
    <div>
      <Message message={store.message} />
      <InfoBlock store={store}/>
      <Safe coins={store.coins} makeCoins={makeCoins} />	
      <NumberContext.Provider value={[store, setStore]}>{children}</NumberContext.Provider>
    </div>
  );
};

const Example = () => {
  return (
    <div>
      <MainLoop>
        <HousesContainer />
      </MainLoop>
    </div>
  );
};
