
// Below is for hashing class name and id to search code in the format e.g. #COMSCI0033>h3>a
// Returns an object with properties: 1) hashed search code for school web named 'school', 
//                                    2) url for the class website named 'url'
//                                    3) hashed search code for BruinWalk named 'bruinwalk', 
//                                    
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////



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
  
  
  
  //////school web hash/////////

  var code = convertion_dict[class_name].slice(1,-1).replace(' ','');

  var id_str = class_num.replace(' ','');
  var id_num_length = class_num.replace(/\D/g,'').length;
  var id_len_full = id_str.length;
  var zero_fill_str = '0'.repeat(4-id_num_length);

  var result_school_web = '#' + code + zero_fill_str + id_str + '>h3>a';
  
  ///////////////////////////
  
  //////url//////////
  
  var url_subj = class_name.trim().replace(' ','+');
  var url_code = convertion_dict[class_name].slice(1,-1).replace(' ','+');
  
  var result_url = 'https://sa.ucla.edu/ro/Public/SOC/Results?t=' + year + term +
  '&sBy=subject&sName='+ url_subj + 
  '%28' + url_code + 
  '%29&subj='+url_code+
  '&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29&catlg=&cls_no=&btnIsInIndex=btn_inIndex';
  
  ///////BruinWalk web hash//////////
  
  var b_code = convertion_dict[class_name].slice(1,-1).toLowerCase().replace(' ','-');
  var b_class_num = class_num.trim().toLowerCase();
  var result_bruinwalk_web = b_code + '-' + b_class_num;
  
  
  var result = {
      school: result_school_web,
      url: result_url,
      bruinwalk: result_bruinwalk_web
  };
  
  return result
}


// Return a dictionary with 5 rating category as indicated below
function hash_ratings(rating_str){
  
  var dict = {
    "Overall":'N/A',
    "Easiness of class":'N/A',
    "Workload":'N/A',
    "Clarity of professor":'N/A',
    "Helpfulness of professor":'N/A'
  };
  
  if (rating_str == '' || rating_str == 'N/A'){
    return dict;
  }
  
  var data = rating_str.trim('\n').trim().split(' \n\n');
  var len = data.length;
  for (var i=0; i<len; i++){
    var arr = data[i].trim().split(' ');
    //console.log(arr)
    var name = String(arr.slice(0,-1).join(' ').trim());
    console.log(name)
    var rat = arr.pop();
    console.log(rat)
    dict[name] = parseFloat(rat)

  }
  console.log(dict);
  return dict;
}

hash_ratings('\nOverall  4.1 \n\nEasiness of class  2.1 \n\nWorkload  1.7 \n\nClarity of professor 4.1 \n\nHelpfulness of professor 3.8 \n');
