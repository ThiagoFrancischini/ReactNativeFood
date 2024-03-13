import 'react-native-gesture-handler'
import { createDrawerNavigator} from '@react-navigation/drawer'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Home from './home';
import colors, { black } from "tailwindcss/colors";
import {Text} from 'react-native'
import CustomDrawerContent from '@/components/CustomDrawerContent';
import Orders from './orders';
import Order from '@/components/order';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(        
        <Drawer.Navigator 
            drawerContent={CustomDrawerContent}
            screenOptions={
                {                    
                    headerShown: false, 
                    drawerHideStatusBarOnOpen: true,
                    drawerActiveBackgroundColor: colors.slate[700],
                    drawerLabelStyle: {marginLeft: -20, fontSize: 16, color: colors.lime[400]},                    
                }
            }>

            <Drawer.Screen
                name='Home'
                component={Home}
                options={
                    {
                        drawerIcon: ({color,size}) => <Feather name='home' color={colors.lime[400]} size={24}></Feather>,                             
                        drawerPosition: 'right',                        
                        drawerInactiveBackgroundColor: 'transparent'
                    }
                }
            />

            <Drawer.Screen
                name='Pedidos'
                component={Orders}
                options={
                    {
                        drawerIcon: ({color,size}) => <MaterialIcons name="delivery-dining" size={24} color={colors.lime[400]}/>,                             
                        drawerPosition: 'right',                        
                        drawerInactiveBackgroundColor: 'transparent'
                    }
                }
            />
        </Drawer.Navigator>                
    );
}