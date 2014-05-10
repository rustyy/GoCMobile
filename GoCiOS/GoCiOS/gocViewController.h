//
//  gocViewController.h
//  GoCiOS
//
//  Created by Eugen Waldschmidt on 16.04.14.
//  Copyright (c) 2014 Zeotyn. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface gocViewController : UIViewController
@property (strong, nonatomic) IBOutlet UIWebView *webView;
@property (strong, nonatomic) IBOutlet UIWebView *webViewiPad;

-(IBAction)refreshPhone:(id)sender;
-(IBAction)refreshPad:(id)sender;
@end
