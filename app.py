from flask import Flask,request, url_for, redirect, render_template,jsonify
import pickle
import numpy as np
import pandas as pd
from datetime import datetime,timedelta
from flask_cors import CORS
from pymongo import MongoClient
import random 
import json
import nltk
from nltk.stem import WordNetLemmatizer
import tensorflow
from tensorflow import keras
from keras.models import load_model
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import spacy

app = Flask(__name__)
CORS(app)
model=pickle.load(open('The_Palmist_new3.pkl','rb'))
tmodel=pickle.load(open('The_TimeMachine_fin.pkl','rb'))
main_test=[]
#a = pd.read_csv("test.csv")
#b = pd.read_csv("updated test.emt_1.csv")
lematizer  = WordNetLemmatizer()
# ln =[]
bm_l = []
x=0
intents = json.loads(open("Intents1.json").read())
dep_model=pickle.load(open('The_Palmist_new3.pkl','rb'))
words = pickle.load(open('Words.pkl','rb'))
classes = pickle.load(open('Classes.pkl','rb'))
m_model = load_model('chatBot_model.h5')
pln = spacy.load('model_out')
ls = pd.read_csv("loop_state.csv")
ls1 = pd.read_csv("extr_state.csv")

lp = list(ls1['lp'])
nn_l = list(ls1['nn_l'])


ls_tag = ls['tag'][0]
ls_count = list(ls['count'])[0]
pr_int = list(ls['pr_int'])[0]
# bot_symp = pd.read_csv("bot_symp")

a = "Itching,Skin Rash,Nodal Skin Eruptions,Continuous Sneezing,Shivering,Chills,Joint Pain,Stomach Pain,Acidity,Ulcers On Tongue,Muscle Wasting,Vomiting,Burning Urination,Spotting Urination,Fatigue,Weight Gain,Anxiety,Cold Hands And Feets,Mood Swings,Weight Loss,Restlessness,Lethargy,Pain In Throat,Irregular Sugar Level,Cough,High Fever,Sunken Eyes,Breathlessness,Sweating,Dehydration,Indigestion,Headache,Yellowish Skin,Dark Urine,Nausea,Loss of Appetite,Pain behind the Eyes,Back Pain,Constipation,Abdominal Pain,Diarrhoea,Mild Fever,Yellow Urine,Yellowing of Eyes,Liver Failure,Fluid Overload,Swelling Of Stomach,Swelled Lymph Nodes,Malaise,Blurred and Distorted Vision,Phlegm,Throat Irritation,Redness of Eyes,Sinus Pressure,Runny Nose,Congestion,Chest Pain,Weakness in Limbs,Fast Heart Rate,Pain During Bowel Movements,Pain in Anal Region,Bloody Stool,Irritation in Anus,Neck Pain,Dizziness,Cramps,Bruising,Obesity,Swollen Legs,Swollen Blood Vessels,Puffy Face,Enlarged Thyroid,Brittle Nails,Swollen Extremeties,Excessive Hunger,Extra-Marital Contacts,Dying Lipds,Slurred Speech,Knee Pain,Hip-Joint Pain,Muscle Weakness,Stiff Neck,Swelling Joints,Movement  Stiffness,Spinning movements,Loss Of Balance,Unsteadiness,Body Weakness,Loss of Smell,Bladder Discomfort,Foul Smell of Urine,Continuous Feel of Urine,Passage Of Gases,Internal itching,Toxic Look,Depression,Irritability,Muscle Pain,Altered Sensorium,Red Spots Over Body,Belly Pain,Abnormal Menstruation,Dischromic Patches,Watering from Eyes,Increased Appetite,Polyuria,Family History,Mucoid Sputum,Rusty Sputum,Lack of Concentration,Visual Disturbances,Receiving Blood Transfusion,Reciving unsterile innjections,Coma,Stomach Bleeding,Distention Of Abdomen,Alcohol addiction,Fuild Overload,Blood in Sputum,Prominent Veins on Calf,Palpitations,Painful Walking,Pimples,Blackheads,Scurring,Skin Peeling,Silver like Dusting,Small Dents in Nails,Inflammatory Nails,Blister,Red Sore around Nose,Yellow Crust Ooze"
a = a.lower()
symptom_list = a.split(",")
client = MongoClient('mongodb+srv://trustcureorg:ksksap@cluster7.hzgfnmh.mongodb.net/?retryWrites=true&w=majority')
db = client.trustcure
doctors_collection = db.doc_avail_new
time_collection = db.time

@app.route('/flask/predict',methods=['POST','GET'])
def predict():
    current_date=datetime.now()
    day_name=current_date.strftime("%A")
    print("day_name:",day_name)
    print("hello")
    a = pd.read_csv("test.csv")
    b = pd.read_csv("updated test.emt_1.csv")
    data = request.get_json()
    int_features = []
   
    print(data)
    x=[]
    for i in data['data']:
        int_features.append(i['label'])
    print(1)
    for i in int_features:
        x.append(b[i][0])
    print(2)
    for i in x:
        a[i][0]=1
    print(3)
    prediction=model.predict(a)[0]
    print(prediction) #logistic regression
    print(model.predict(a))
    snakes = pd.read_csv("Snakes_fin.csv")
    output = snakes.iloc[prediction][1] 
    l=[]
    h=[]
    amt=[]
    t=[]
    r=[]
    n=[]
    s_t=[]
    doc_wtl = pd.read_csv("Doc_wtl_n1.csv")
    doc_desc=pd.read_csv("Doctordescrpitions.csv")
   
    ut = doc_wtl['Time'].max()
    lt = doc_wtl['Time'].min()
    dt = ut - lt
    #len(df['Time'])
    for i in range(len(doc_wtl['Time'])):
        st = doc_wtl['Time'][i] - lt
        if dt == 0:
            dft = 0
        else:
            dft = st/dt
        dft = 1 - dft
        dfr = doc_wtl['Rating'][i]/5
        doc_wtl['Norm'][i] = dft*0.6 + dfr*0.4
    doc_wtl.sort_values(by = 'Norm', ascending = 0)

    for i in range(2,6):
        l.append(snakes.iloc[prediction][i])
        a12 = doc_wtl[doc_wtl['Doc_Name']== snakes.iloc[prediction][i]].index.values[0]
        t.append(str(doc_wtl['Time'][a12]))
        r.append(str(doc_wtl['Rating'][a12]))
        n.append(str(doc_wtl['Norm'][a12]))
        s_t.append(str(doc_wtl[f"{day_name}"][a12]))
        if i == 2:
            h.append("Trust Cure Hospitals")
            amt.append("500")
        elif i==3:
            h.append("Trust Cure Hospitals")
            amt.append("540")
        elif i==4:
            h.append("Apollo Hospitals")
            amt.append("600")
        elif i==5:
            h.append("Kamineni Hospital")
            amt.append("450")

    main_desc=doc_desc[doc_desc['Doctor names'].isin(l)]
    desc=main_desc.iloc[:,5].tolist()
    n_dic = {'doctor_list':l,"hospitals_list":h,"time":t, "rating":r,"Norm":n,"slot":s_t,"dayName":day_name,"amt":amt,'desc':desc}
    url = 'https://docs.google.com/spreadsheets/d/1rZutJ4-S0YK-Yw3URsJN5BacnUO-Z8R2Lt8F88N32cU/export?format=csv&gid=243849322'
    gf1 = pd.read_csv(url)
    last_updated_time = time_collection.find_one()
    last_updated_time = last_updated_time['time']
    print(last_updated_time)
    # time_document = last_updated_time_.next() if last_updated_time_.count()>0 else None
    # print(time_document)
    # time = time_document["time"] if time_document else None
    # print(time)
    gf2 = gf1[gf1['DateTime']>last_updated_time]
    print(gf2.empty)
    if not gf2.empty:

        example = gf2['Doctor_ID'].index.values
        last_index = example[-1] 
        time = gf2['DateTime'][last_index]
        print(time)
    # time = example['DateTime'][example[-1]]
        latest_time = time_collection.update_one({},{"$set":{'time': time}})
        # if time > last_updated_time:
        print("#############")
        for i in example:
        
                # print(doctor_id)
                doctor_doc = doctors_collection.find_one({"doc_id": gf2['Doctor_ID'][i]})
                if doctor_doc:
                # Toggle status based on existing status
                    new_status = "absent" if doctor_doc["status"] == "present" else "present"
                    doctors_collection.update_one({"doc_id": gf2['Doctor_ID'][i]}, {"$set": {"status": new_status}})
                    print(new_status)
                else:
                    # Doctor ID not found, handle as needed (e.g., log a message)
                    print(f"Doctor ID {gf2['Doctor_ID'][i]} not found in MongoDB collection.")
    print("helllo")
    print(day_name)
    n_dtf = pd.DataFrame(n_dic)
    n_dtf.sort_values(by = 'Norm', ascending = 0,inplace = True)
    n_dtf = n_dtf.astype(str)
    

    print(output)
    print(x)
    print(prediction)
    return {"value" : output,"doctor_list":list(n_dtf['doctor_list']),"hospitals_list":list(n_dtf["hospitals_list"]),"time":list(n_dtf["time"]), "rating":list(n_dtf["rating"]), "slot":list(n_dtf["slot"]),"dayName":day_name,"amt":list(n_dtf["amt"]),'desc':list(n_dtf['desc'])} #jsonify('{value : 21}'), 200, {'Content-Type': 'application/json'}

@app.route('/flask/chatBot',methods=['POST','GET'])
def bot():
    ls = pd.read_csv("loop_state.csv")
    ls1 = pd.read_csv("extr_state.csv")
    ls_tag = list(ls['tag'])[0]
    # print(ls_tag)
    lp = list(ls1['lp'])
    nn_l = list(ls1['nn_l'])
    ls_count = list(ls['count'])[0]
    pr_int = list(ls['pr_int'])[0]
    message = request.get_json()
    botMsg=message['userMessage']
    # message = input('You: ')
    bool_mat = con_mat(botMsg)
    ints = pre_cls(botMsg)
    preint = ints[0]['intent']
    print(preint)
    print(ls_tag)
    print(type(preint))
    print(lp)
    print(nn_l)
    # print(type(ls_tag))
    if ls_tag == 'yes' and preint == 'RES':
        print(1)
        # print(ls_tag)
        ls_int = intents['intents']
        ls_res = []
        for i in ls_int:
            if i['tag'] == pr_int:
                ls_res = i['responses']
                break
        if ls_count < len(ls_res):
            if ls_count == len(ls_res):
                ls_tag = 'no'
            ls_count = ls_count+1
            print(f'Bot: {ls_res[ls_count-1]}')
            res = ls_res[ls_count-1]
            lsc=[]
            lsp = []
            lst = []
            lsp.append(pr_int)
            lst.append(ls_tag)
            lsc.append(ls_count)
            df1 = pd.DataFrame({'pr_int': lsp,'tag': lst,'count':lsc})
            df1.to_csv("loop_state.csv",index=False)
            # df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
            # df.to_csv("extr_state.csv",index=False)
            return {"response":res}

            

    elif preint != 'exit':
        print(2)
        res = get_res(ints, intents)
        if bool_mat:
            print(f"Bot🤖: I've already noted this symptom tell me about other symptoms.")
            res = "Bot🤖: I've already noted this symptom tell me about other symptoms."
            return {"response":res}


        elif ints[0]['intent'] == 'symptoms':
            nn_extrct(botMsg)
            res = get_res(ints, intents)
            print(f'Bot🤖: {res}')
            # df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
            # df.to_csv("extr_state.csv",index=False)
            return {"response":list(res)}
        elif preint in ['FEVER','COLD','STOMACHPAIN','HEADACHE','ITCHING','JOINTPAIN','CHESTPAIN','EYEPAIN']:
            print("entered")
            nn_extrct(botMsg)
            ls_int = intents['intents']
            ls_res = []
            for i in ls_int:
                if i['tag'] == preint:
                    ls_res = i['responses']
                    break
            ls_tag = 'yes'
            pr_int = preint
            ls_count = 1
            print(f"Bot: Don't worry I'll assist you.\n {ls_res[0]}")
            res = ls_res[0]
            lsc=[]
            lsp = []
            lst = []
            lsp.append(pr_int)
            lst.append(ls_tag)
            lsc.append(ls_count)
            print(len( lsp))
            print(len(lst))
            print(len(lsc))
            df1 = pd.DataFrame({'pr_int': lsp,'tag': lst,'count':lsc})
            # df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
            # df.to_csv("extr_state.csv",index=False)
            df1.to_csv("loop_state.csv",index=False)
            return {"response":"Don't worry I'll assist you"+res}
        else:
            res = get_res(ints, intents)
            print(f"Bot🤖: {res}")
            # df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
            # df.to_csv("Nrm_1/extr_state")
            return {"response":res}
    ls1 = pd.read_csv("extr_state.csv")
    lp = list(ls1['lp'])
    nn_l = list(ls1['nn_l'])
    print(lp)
    print(nn_l)
    if ints[0]['intent'] == 'exit':
        lp_bm = bm_fuz()
        lp_bm = set(lp_bm)
        lp_bm = list(lp_bm)
        # print(lp_bm)
        res = pre_dep(lp_bm)
        lp =[]
        nn_l =[]
        lsc=[0]
        lsp = ['none']
        lst = ['no']
        df1 = pd.DataFrame({'pr_int': lsp,'tag': lst,'count':lsc})
        df1.to_csv("loop_state.csv",index=False)
        df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
        df.to_csv("extr_state.csv",index=False)
        print(res)
            
    return {"response":res}
   

    
def clean_sen(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    ls1 = pd.read_csv("extr_state.csv")
    lp = list(ls1['lp'])
    nn_l = list(ls1['nn_l'])
    l = ["itching", "skin rash", "nodal skin eruptions", "continuous sneezing", "shivering", "chills", "joint pain", "stomach pain", "acidity", "ulcers on tongue", "muscle wasting", "vomiting", "burning urination", "spotting urination", "fatigue", "weight gain", "anxiety", "cold hands and feets", "mood swings", "weight loss", "restlessness", "lethargy", "pain in throat", "irregular sugar level", "cough", "high fever", "sunken eyes", "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish skin", "dark urine", "nausea", "loss of appetite", "pain behind the eyes", "back pain", "constipation", "abdominal pain", "diarrhoea", "mild fever", "yellow urine", "yellowing of eyes", "liver failure", "fluid overload", "swelling of stomach", "swelled lymph nodes", "malaise", "blurred and distorted vision", "phlegm", "throat irritation", "redness of eyes", "sinus pressure", "runny nose", "congestion", "chest pain", "weakness in limbs", "fast heart rate", "pain during bowel movements", "pain in anal region", "bloody stool", "irritation in anus", "neck pain", "dizziness", "cramps", "bruising", "obesity", "swollen legs", "swollen blood vessels", "puffy face", "enlarged thyroid", "brittle nails", "swollen extremeties", "excessive hunger", "extra-marital contacts", "dying lipds", "slurred speech", "knee pain", "hip-joint pain", "muscle weakness", "stiff neck", "swelling joints", "movement stiffness", "spinning movements", "loss of balance", "unsteadiness", "body weakness", "loss of smell", "bladder discomfort", "foul smell of urine", "continuous feel of urine", "passage of gases", "internal itching", "toxic look", "depression", "irritability", "muscle pain", "altered sensorium", "red spots over body", "belly pain", "abnormal menstruation", "dischromic patches", "watering from eyes", "increased appetite", "polyuria", "family history", "mucoid sputum", "rusty sputum", "lack of concentration", "visual disturbances", "receiving blood transfusion", "reciving unsterile innjections", "coma", "stomach bleeding", "distention of abdomen", "alcohol addiction", "fuild overload", "blood in sputum", "prominent veins on calf", "palpitations", "painful walking", "pimples", "blackheads", "scurring", "skin peeling", "silver like dusting", "small dents in nails", "inflammatory nails", "blister", "red sore around nose", "yellow crust ooze"]
    sentence_words = [lematizer.lemmatize(word) for word in sentence_words]
    for i in l:
        if i in sentence:
            lp.append(i)
            nn_l.append('0')
    df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
    df.to_csv("extr_state.csv",index=False)
    return sentence_words


def con_mat(sen):
    ext_con = []
    for i in symptom_list:
        if i in sen:
            ext_con.append(i)
    if len(ext_con)==1 and ext_con:
        print(ext_con)
        if ext_con[0] in lp:
            return True
    return False


def bag_of_words(sentence):
    sentence_words = clean_sen(sentence)
    bag = [0]*len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)



def pre_cls(sentence):
    bow = bag_of_words(sentence)
    res = m_model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r> ERROR_THRESHOLD]
    results.sort(key = lambda x:x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1]) })
    return return_list



def pre_dep(n12):
    a = pd.read_csv("test.csv")
    b = pd.read_csv("updated test.emt_1 copy.csv")
    x=[]
    for i in n12:
        #
        x.append(b[i][1])
    for i in x:
        a[i][0]=1
    prediction=dep_model.predict(a)[0]
    snakes = pd.read_csv("Snakes_fin.csv")
    output = snakes.iloc[prediction][1]
    print("++++++"+"it seems you have to consult a",output)
    return "it seems you have to consult a"+output

def get_res(intents_list, intents_json):
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result


def nn_extrct(text):
    cod = pln(text)
    ls1 = pd.read_csv("extr_state.csv")
    lp = list(ls1['lp'])
    nn_l = list(ls1['nn_l'])
    for ent in cod.ents:
        if ent.label_ == 'SYMPTOMS':
            nn_l.append(ent.text)
            lp.append('0')
            # bot_symp['nn_l'].append(ent.text)
    print(nn_l)
    print(lp)
    df = pd.DataFrame({'lp':lp, 'nn_l':nn_l})
    df.to_csv("extr_state.csv",index=False)





def bm_fuz():
    bm_l =[]
    ls1 = pd.read_csv("extr_state.csv")
    lp = list(ls1['lp'])
    nn_l = list(ls1['nn_l'])
    lp1 = []
    nn_l1 = []
    for i in lp:
        if i!='0':
            lp1.append(i)
    for i in nn_l:
        if i!='0':
            nn_l1.append(i)
    for i in nn_l1:
        print(i)
        best_match, score = process.extractOne(i.lower(), symptom_list, scorer=fuzz.ratio)
        bm_l.append(best_match)
        if score >= 60: 
            bm_l.append(best_match)
    return lp1+bm_l
    # print("BM")
    # print(bm_l)
    



@app.route('/flask/status',methods=['POST','GET'])
def status():
    url = 'https://docs.google.com/spreadsheets/d/1rZutJ4-S0YK-Yw3URsJN5BacnUO-Z8R2Lt8F88N32cU/export?format=csv&gid=243849322'
    gf1 = pd.read_csv(url)
    last_updated_time = time_collection.find_one()
    last_updated_time = last_updated_time['time']
    print(last_updated_time)
    # time_document = last_updated_time_.next() if last_updated_time_.count()>0 else None
    # print(time_document)
    # time = time_document["time"] if time_document else None
    # print(time)
    gf2 = gf1[gf1['DateTime']>last_updated_time]
    print(gf2.empty)
    if not gf2.empty:

        example = gf2['Doctor_ID'].index.values
        last_index = example[-1] 
        time = gf2['DateTime'][last_index]
        print(time)
    # time = example['DateTime'][example[-1]]
        latest_time = time_collection.update_one({},{"$set":{'time': time}})
        # if time > last_updated_time:
        print("#############")
        for i in example:
        
                # print(doctor_id)
                doctor_doc = doctors_collection.find_one({"doc_id": gf2['Doctor_ID'][i]})
                if doctor_doc:
                # Toggle status based on existing status
                    new_status = "absent" if doctor_doc["status"] == "present" else "present"
                    doctors_collection.update_one({"doc_id": gf2['Doctor_ID'][i]}, {"$set": {"status": new_status}})
                    print(new_status)
                else:
                    # Doctor ID not found, handle as needed (e.g., log a message)
                    print(f"Doctor ID {gf2['Doctor_ID'][i]} not found in MongoDB collection.")
        return ''
@app.route('/flask/rating',methods=['POST','GET'])
def rating():
    list_a=pd.read_csv("Doc_wtl_n1.csv")
    a=request.get_json()
    docName=a['docName']
    x=list_a[list_a['Doc_Name']==docName].index.values
    data=doctors_collection.find_one({'doc_name':a['docName']})
    rating_sum=data['rating']
    main_sum=sum(rating_sum)
    count=data['patient_count']
    avg=main_sum/count
    l=round(avg,1)
    list_a['Rating'][x[0]]=l
    list_a.to_csv("doc_wtl_n1.csv",index=False)
    print(l)
    print(x)
    return ''

@app.route('/flask/otherDoctors',methods=['POST','GET'])
def otherDoc():
    snakes = pd.read_csv("Snakes_fin.csv")
    doctor_names = snakes.iloc[:, 2:].values.flatten().tolist()
    print(doctor_names)
    doc1=[]
    doc2=[]
    for i in range(0,48,4):
        doc1.append("Trust Cure Hospitals")
        doc1.append("Trust Cure Hospitals")
        doc1.append("Apollo Hospitals")
        doc1.append("Kamineni Hospitals")
    for i in range(1):
            doc2.extend(["Allergist"]*4)
            doc2.extend(["Cardiologist"]*4)
            doc2.extend(["Dermatologist"]*4)
            doc2.extend(["ENT Specialist"]*4)
            doc2.extend(["Gastroenterologist"]*4)
            doc2.extend(["General Physician"]*4)
            doc2.extend(["Infectious Disease Specialist"]*4)
            doc2.extend(["Ophthalmologist"]*4)
            doc2.extend(["Orthopedician"]*4)
            doc2.extend(["Psychiatrist"]*4)
            doc2.extend(["Pulmonologist"]*4)
            doc2.extend(["Rheumatologist"]*4)

    print(doc1)
    print(doc2)
    return {"other_doctor_names":doctor_names,"hospitals_name":doc1,"speciality":doc2}

@app.route('/flask/amg',methods=['POST','GET'])
def pre_time():
    print("hello")
    b = pd.read_csv("updated test.emt_1.csv")
    a = pd.read_csv("NT_emt.csv")
    data = request.get_json()
    doc = data['name']
    print(doc)
    hos = data['hospital']
    if hos == "Trust Cure Hospitals":
        hos = "Pre_Corporate"
    elif hos == "Apollo Hospitals":
        hos = "Corporate"
    elif hos == "Kamineni Hospital":
        hos = "Clinic"
    print(hos)
    dep = data['department']
    int_features = []
    print(data)
    x=[]
    for i in data['data']:
        int_features.append(i['label'])
    print(1)
    for i in int_features:
        x.append(b[i][0])
    print(2)
    for i in x:
        a[i][0]=1
    c = pd.read_csv("Dep_ie_fin.csv")
    d = pd.read_csv("Hst_ie_fin.csv")
    print("nice")
    print(dep)
    p = c[dep][0]
    q = d[hos][0]
    print("nice")
    a['Department'][0] = p
    a['Hospital_Type'][0] = q
    pre_t=tmodel.predict(a)
    print(pre_t)
    doc_wtl = pd.read_csv("Doc_wtl_n1.csv")
    x1 = doc_wtl[doc_wtl['Doc_Name']==doc].index.values[0]
    doc_wtl['Time'][x1]= doc_wtl["Time"][x1]+pre_t[0]
    print(doc_wtl['Time'][x1])
    doc_wtl.to_csv("doc_wtl_n1.csv",index=False)
    return {}

   
if __name__ == '__main__':
    app.run(debug=True)
    # bot()