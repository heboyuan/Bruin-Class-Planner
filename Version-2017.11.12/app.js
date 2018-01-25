var Horseman = require("node-horseman"),
    async = require("async"),
    request = require('request'),
    cheerio = require('cheerio'),
    express = require('express'),
    bodyParser = require("body-parser");

//Input & Result__________________________________________________________________________________________________________________
var classList = [];

var result = [],
    temp = {rating:""};
//_____________________________________________________________________________________________________________________________________

//Initialization__________________________________________________________________________________________________________________
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
//_____________________________________________________________________________________________________________________________________

//Functions____________________________________________________________________________________________________________________________

// Return a dictionary with 5 rating category as indicated below
function hash_ratings(rating_str){
  var dict = {
    "Overall ":'N/A',
    "Easiness of class ":'N/A',
    "Workload ":'N/A',
    "Clarity of professor":'N/A',
    "Helpfulness of professor":'N/A'
  };
  
  if (rating_str == '' || rating_str == 'N/A'){
    console.log(dict);
    return dict;
  }
  
  var data = rating_str.trim('\n').trim().split(' \n\n');
  var len = data.length;
  for (var i=0; i<len; i++){
    var arr = data[i].trim().split(' ');
    //console.log(arr)
    var name = arr.slice(0,-1).join(' ');
    console.log(name)
    var rat = arr.pop();
    //console.log(rat)
    dict[name] = parseFloat(rat);
  }
  console.log(dict);
  return dict;
}

function hash_class(class_name, class_num, year='18', term='W'){
  var convertion_dict = {
    'Aerospace Studies': '(AERO ST)',
    'African American Studies': '(AF AMER)',
    'African Studies': '(AFRC ST)',
    'Afrikaans': '(AFRKAAN)',
    'American Indian Studies': '(AM IND)',
    'American Sign Language': '(ASL)',
    'Ancient Near East': '(AN N EA)',
    'Anesthesiology': '(ANES)',
    'Anthropology': '(ANTHRO)',
    'Applied Linguistics': '(APPLING)',
    'Archaeology': '(ARCHEOL)',
    'Architecture and Urban Design': '(ARCH)',
    'Armenian': '(ARMENIA)',
    'Art': '(ART)',
    'Art History': '(ART HIS)',
    'Arts and Architecture': '(ART&ARC)',
    'Asian American Studies': '(ASIA AM)',
    'Astronomy': '(ASTR)',
    'Atmospheric and Oceanic Sciences': '(A&SCI)',
    'Bioengineering': '(BIOENGR)',
    'Bioinformatics': '(BIOINFO)',
    'Biological Chemistry': '(BIOLCH)',
    'Biomathematics': '(BIOMATH)',
    'Biomedical Research': '(BMDRES)',
    'Biostatistics': '(BIOSTAT)',
    'Central and East European Studies': '(C&ST)',
    'Chemical Engineering': '(CH ENGR)',
    'Chemistry and Biochemistry': '(CHEM)',
    'Chicana and Chicano Studies': '(CHICANO)',
    'Chinese': '(CHIN)',
    'Civic Engagement': '(CIVIC)',
    'Civil and Environmental Engineering': '(C&EE)',
    'Classics': '(CLASSIC)',
    'Clusters': '(CLUSTER)',
    'Communication': '(COMM)',
    'Community Health Sciences': '(COM HLT)',
    'Comparative Literature': '(COM LIT)',
    'Computational and Systems Biology': '(C&BIO)',
    'Computer Science': '(COM SCI)',
    'Conservation of Archaeological and Ethnographic Materials': '(CAEM)',
    'Dance': '(DANCE)',
    'Design | Media Arts':'(DESMA)',
    'Digital Humanities':'(DGT HUM)',
    'Disability Studies': '(DIS STD)',
    'Dutch': '(DUTCH)',
    'Earth, Planetary, and Space Sciences': '(EPS SCI)',
    'Ecology and Evolutionary Biology': '(EE BIOL)',
    'Economics': '(ECON)',
    'Education': '(EDUC)',
    'Electrical and Computer Engineering': '(EC ENGR)',
    'Electrical Engineering': '(EL ENGR)',
    'Engineering': '(ENGR)',
    'English': '(ENGL)',
    'English as A Second Language': '(ESL)',
    'English Composition': '(ENGCOMP)',
    'Environment': '(ENVIRON)',
    'Environmental Health Sciences': '(ENV HLT)',
    'Epidemiology': '(EPIDEM)',
    'Ethnomusicology': '(ETHNMUS)',
    'Filipino': '(FILIPNO)',
    'Film and Television': '(FILM TV)',
    'French': '(FRNCH)',
    'Gender Studies': '(GENDER)',
    'Geography': '(GEOG)',
    'German': '(GERMAN)',
    'Gerontology': '(GRNTLGY)',
    'Global Health': '(GLB HLT)',
    'Global Studies': '(GLBL ST)',
    'Graduate Student Professional Development': '(GRAD PD)',
    'Greek': '(GREEK)',
    'Health Policy and Management': '(HLT POL)',
    'Hebrew': '(HEBREW)',
    'Hindi-Urdu': '(HIN-URD)',
    'History': '(HIST)',
    'Honors Collegium':'(HNRS)',
    'Human Genetics':'(HUM GEN)',
    'Hungarian':'(HNGAR)',
    'Indigenous Languages of the Americas':'(IL AMER)',
    'Indo-European Studies':'(I E STD)',
    'Indonesian':'(INDO)',
    'Information Studies':'(INF STD)',
    'International and Area Studies':'(I A STD)',
    'International Development Studies':'(INTL DV)',
    'Iranian': '(IRANIAN)',
    'Islamic Studies':'(ISLM ST)',
    'Italian':'(ITALIAN)',
    'Japanese':'(JAPAN)',
    'Jewish Studies':'(JEWISH)',
    'Korean':'(KOREA)',
    'Labor and Workplace Studies':'(LBR&WS)',
    'Latin': '(LATIN)',
    'Latin American Studies':'(LATN AM)',
    'Lesbian, Gay, Bisexual, Transgender, and Queer Studies':'(LGBTQS)',
    'Life Sciences':'(LIFESCI)',
    'Linguistics':'(LING)',
    'Management':'(MGMT)',
    'Management-Master of Financial Engineering':'(MGMTMFE)',
    'Management-Master of Science in Business Analytics':'(MGMTMSA)',
    'Management-PhD':'(MGMTPHD)',
    'Materials Science and Engineering':'(MAT SCI)',
    'Mathematics':'(MATH)',
    'Mechanical and Aerospace Engineering':'(MECH&AE)',
    'Medical History':'(MED HIS)',
    'Medicine':'(MED)',
    'Microbiology, Immunology, and Molecular Genetics':'(MIMG)',
    'Middle Eastern Studies':'(M E STD)',
    'Military Science':'(MIL SCI)',
    'Molecular and Medical Pharmacology':'(M PHARM)',
    'Molecular Biology':'(MOL BIO)',
    'Molecular Toxicology':'(MOL TOX)',
    'Molecular, Cell, and Developmental Biology':'(MCD BIO)',
    'Molecular, Cellular, and Integrative Physiology':'(MC&IP)',
    'Music':'(MUSC)',
    'Music History':'(MSC HST)',
    'Music Industry':'(MSC IND)',
    'Musicology':'(MUSCLG)',
    'Naval Science':'(NAV SCI)',
    'Near Eastern Languages':'(NR EAST)',
    'Neurobiology':'(NEURBIO)',
    'Neurology':'(NEURLGY)',
    'Neuroscience (Graduate)':'(NEURO)',
    'Neuroscience':'(NEUROSC)',
    'Nursing': '(NURSING)',
    'Obstetrics and Gynecology':'(OBGYN)',
    'Oral Biology':'(ORL BIO)',
    'Pathology and Laboratory Medicine':'(PATH)',
    'Philosophy':'(PHILOS)',
    'Phyiscs': '(PHYSICS)',
    'Physics and Biology in Medicine':'(PBMED)',
    'Physiology':'(PHYSIOL)',
    'Polish':'(POLSH)',
    'Political Science':'(POL SCI)',
    'Portuguese':'(PORTGSE)',
    'Program in Computing':'(COMPTNG)',
    'Psychiatry and Biobehavioral Sciences':'(PSYCTRY)',
    'Psychology':'(PSYCH)',
    'Public Health':'(PUB HLT)',
    'Public Policy':'(PUB PLC)',
    'Religion, Study of':'(RELIGN)',
    'Romanian':'(ROMANIA)',
    'Russian':'(RUSSN)',
    'Scandinavian':'(SCAND)',
    'Science Education':'(SCI EDU)',
    'Semitic':'(SEMITIC)',
    'Serbian/Croatian':'(SRB CRO)',
    'Slavic':'(SLAVC)',
    'Social Science':'(SOC SC)',
    'Social Thought':'(SOC THT)',
    'Social Welfare':'(SOC WLF)',
    'Society and Genetics':'(SOC GEN)',
    'Sociology':'(SOCIOL)',
    'South Asian':'(S ASIAN)',
    'Southeast Asian':'(SEASIAN)',
    'Spanish':'(SPAN)',
    'Statistics':'(STATS)',
    'Surgery': '(SURGERY)',
    'Swahili': '(SWAHILI)',
    'Thai':'(THAI)',
    'Theater':'(THEATER)',
    'Turkic Languages':'(TURKIC)',
    'University Studies':'(UNIV ST)',
    'Urban Planning':'(URBN PL)',
    'Vietnamese':'(VIETMSE)',
    'World Arts and Cultures':'(WL ARTS)',
    'Yiddish':'(YIDDSH)'
  };

  //school web hash
  var code = convertion_dict[class_name].slice(1,-1).replace(' ','');

  var id_str = class_num.replace(' ','');
  var id_num_length = class_num.replace(/\D/g,'').length;
  var id_len_full = id_str.length;
  var zero_fill_str = '0'.repeat(4-id_num_length);

  var result_school_web = '#' + code + zero_fill_str + id_str + '>h3>a';
  
  
  //url
  
  var url_subj = class_name.trim().replace(' ','+');
  var url_code = convertion_dict[class_name].slice(1,-1).replace(' ','+');
  
  var result_url = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=' + year + term +
  '&sBy=subject&sName='+ url_subj + 
  '%28' + url_code + 
  '%29&subj='+url_code+
  '&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex';
  
  //BruinWalk web hash
  
  var b_code = convertion_dict[class_name].slice(1,-1).toLowerCase().replace(' ','-');
  var b_class_num = class_num.trim().toLowerCase();
  var result_bruinwalk_web = b_code + '-' + b_class_num;
  
  
  var result = {professors:[],
        find:false,
        classSelector: result_school_web,
        URL: result_url,
        bruinLink: result_bruinwalk_web,
        name:class_name + " " + class_num
  };
  
  return result;
}

//Check if there is next class
function haveNext(horseman){
    return horseman.evaluate(function(){
        return $( ".jPag-current:first" ).text() != (($( ".jPag-pages>li" ).length)/2).toString();
    });
}

//Find specific class
function findClass(info,horseman){
    return horseman.wait(1150) //Wait01 wait for the page to load
        .exists(info.classSelector)
        .then(function(exist){
            console.log(info.classSelector);
            console.log(exist);
            if(exist){
                horseman.click(info.classSelector)
                            .wait(400)  //Wait02 for the drop down of the specific class
                            .evaluate(function(){
                                    var li = [];
                                    $( ".instructorColumn" ).each(function() {
                                        li.push($( this ).text());
                                    });
                                    return jQuery.unique(li);
                            })
                            .then(function(li){
                                info.find = true;
                                info.professors = info.professors.concat(li.slice(1));
                            })
            }
        })

}

//Search specific page for class
function searchPage(info,horseman){
    return new Promise(function(resolve, reject){
        return findClass(info,horseman)
            .delay(950)//Wait03(Wait01 & 02) for findClass to finish
            .then(function(){
                if(info.find == false){
                    return haveNext(horseman)
                        .then(function(n){
                            if(n){
                                return horseman.click(".jPag-snext-img")
                                .then(searchPage(info,horseman))
                            }else{
                                console.log('class not offered')
                                return false;
                            }
                    });
                }
            })    
            .then(resolve);
    });
}
//_____________________________________________________________________________________________________________________________________


//Express Handlers____________________________________________________________________________________________________________________________
app.get("/",function(req,res){
    result.length = 0;
    res.render("index.ejs");
});

app.get("/search",function(req,res){
    res.render("Output.ejs",{result:result});
});

app.post("/search", function(req,res){
    if(req.body.sub1 != ""){
        classList.push(hash_class(req.body.sub1, req.body.class1));
    }
    if(req.body.sub2 != ""){
        classList.push(hash_class(req.body.sub2, req.body.class2));
    }
     if(req.body.sub3 != ""){
         classList.push(hash_class(req.body.sub3, req.body.class3));
     }
     if(req.body.sub4 != ""){
         classList.push(hash_class(req.body.sub4, req.body.class4));
     }
     if(req.body.sub5 != ""){
         classList.push(hash_class(req.body.sub5, req.body.class5));
     }
     if(req.body.sub6 != ""){
         classList.push(hash_class(req.body.sub6, req.body.class6));
     }
    
    console.log(classList);

    async.each(classList, function(info, callback){
        var classResult = {name:info.name, results:[]};
        var horseman = new Horseman();
        horseman.open(info.URL)
            .then(searchPage(info,horseman))
            .delay(6000) //Wait04(Wait01 & 02 & 03)
            .then(function(){
                async.each(info.professors, function(name, callback){
                    var bruinSearchURL = "http://www.bruinwalk.com/search/?q=" + name;
                    request(bruinSearchURL,function(error, response, html){
                        var $ = cheerio.load(html);
                        var profURL = "http://www.bruinwalk.com" + $(".professor-result").first().find("a").attr('href') + info.bruinLink;
                        var profURLAll = "http://www.bruinwalk.com" + $(".professor-result").first().find("a").attr('href') + "all";
                        request(profURL,function(error, response, html){
                                if (!error && response.statusCode == 200) {
                                    var $ = cheerio.load(html);
                                    var score = {}; 
                                    $(".bar-fill.has-tip.tip-left").each(function(index){
                                        if(index == 13){
                                            return;
                                        }
                                        switch(index) {
                                            case 0:
                                                score["A+"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 1:
                                                score["A"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 2:
                                                score["A-"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 3:
                                                score["B+"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 4:
                                                score["B"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 5:
                                                score["B-"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 6:
                                                score["C+"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 7:
                                                score["C"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 8:
                                                score["C-"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 9:
                                                score["D+"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 10:
                                                score["D"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 11:
                                                score["D-"] = parseFloat($( this ).attr("title"));
                                                break;
                                            case 12:
                                                score["F"] = parseFloat($( this ).attr("title"));
                                                break;
                                        }
                                    });
                                    temp.rating = $(".metric").text();
                                    var l = [];
                                    $( ".content-area" ).each(function(){
                                        l.push({term:$( this ).find(".term-taken").text().substr(16,11), grade:$( this ).find(".grade-received").text().substr(17,1), content:$( this ).find("p").text()});
                                    });
                                    console.log(temp.rating);
                                    classResult.results.push({name:name, rating:hash_ratings(temp.rating), comments:l, scores:score});
                                    console.log(name + " have " + info.classSelector.substring(1,11));
                                    callback();
                                }else if (!error && response.statusCode == 404){
                                    request(profURLAll, function(error, response, html){
                                        if (!error && response.statusCode == 200) {
                                            var $ = cheerio.load(html);
                                            temp.rating = $(".metric").text();
                                            var l = [];
                                            $( ".content-area" ).each(function(){
                                                l.push({term:$( this ).find(".term-taken").text().substr(16,11), grade:$( this ).find(".grade-received").text().substr(17,1), content:$( this ).find("p").text()});
                                            });
                                            classResult.results.push({name:name, rating:hash_ratings(temp.rating), comments:l});
                                            console.log(name + " have records");
                                            callback();
                                        }else{
                                            console.log(name + " doen't have " + info.classSelector.substring(1,11));
                                            classResult.results.push({name:name, rating:hash_ratings(temp.rating), comments:['N/A']});
                                            callback();
                                        }
                                    })
                                }else{
                                    console.log("error!!!");
                                    callback();
                                }
                            });
                    });
                },function(err){
                    horseman.close();
                    result.push(classResult);
                    callback();
                });
            });
    },function(err){
         result.forEach(function(x){
             console.log(x.name);
             console.log(x.results);
            x.results.forEach(function(y){
                y.comments.forEach(function(z){
                    console.log(z);
                })
            })
             })
         res.redirect("/search");
    });
});
//_____________________________________________________________________________________________________________________________________


//Cloud9 Listener____________________________________________________________________________________________________________________________
app.listen(process.env.PORT, process.env.IP,function(){
  console.log('Started')
});
//_____________________________________________________________________________________________________________________________________